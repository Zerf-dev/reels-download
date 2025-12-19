import { NextRequest, NextResponse } from "next/server";

// import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";

import { getInstagramUserPostsGraphQL } from "./utils";

interface RouteContext {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { username } = await context.params;

  if (!username) {
    return NextResponse.json(
      { error: "noUsername", message: "username is required" },
      { status: 400 }
    );
  }

  try {
    const allPosts: Array<{ shortcode: string; id: string; url: string }> = [];
    let after: string | null = null;
    let hasMore = true;
    const maxPosts = 25;

    // Fetch posts in batches until we have maxPosts or run out
    while (allPosts.length < maxPosts && hasMore) {
      console.log(
        `Fetching page with cursor: ${after || "none (first page)"} (have ${allPosts.length} posts so far)`
      );

      const response = await getInstagramUserPostsGraphQL({
        username,
        after: after || undefined,
      });

      const status = response.status;

      if (status === 200) {
        const responseData = (await response.json()) as any;

        // Check for errors in response
        if (responseData.errors) {
          console.error("GraphQL Errors:", responseData.errors);
          break;
        }

        const connection =
          responseData.data
            ?.xdt_api__v1__feed__user_timeline_graphql_connection;

        if (!connection?.edges) {
          console.log("No edges found in connection");
          break;
        }

        // Parse the response structure for PolarisProfilePostsQuery
        const posts = connection.edges.map((edge: any) => ({
          shortcode: edge.node.code,
          id: edge.node.id,
          url: `https://www.instagram.com/p/${edge.node.code}/`,
        }));

        console.log(
          `Got ${posts.length} posts. Page info:`,
          JSON.stringify(connection.page_info, null, 2)
        );

        // Check for duplicates before adding
        const newPosts = posts.filter(
          (post: { shortcode: string; id: string; url: string }) =>
            !allPosts.some((existing) => existing.id === post.id)
        );

        if (newPosts.length === 0 && posts.length > 0) {
          console.log("All posts are duplicates, stopping pagination");
          hasMore = false;
          break;
        }

        allPosts.push(...newPosts);

        // Check if there are more pages and get the cursor for the next page
        hasMore =
          connection.page_info?.has_next_page === true &&
          connection.page_info?.end_cursor != null;

        // Use the end_cursor string from Instagram's response for the next request
        after = connection.page_info?.end_cursor || null;

        console.log(
          `Has more: ${hasMore}, Next cursor: ${after ? after.substring(0, 30) + "..." : "none"}`
        );

        // If we got fewer posts than expected, we might have reached the end
        if (posts.length === 0) {
          hasMore = false;
        }
      } else {
        console.log(`Request failed with status: ${status}`);
        break;
      }

      // Small delay between requests to avoid rate limiting
      if (hasMore && allPosts.length < maxPosts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (allPosts.length === 0) {
      return NextResponse.json(
        { error: "noPosts", message: "No posts found" },
        { status: 404 }
      );
    }

    // Return up to 50 posts
    return NextResponse.json(
      { data: allPosts.slice(0, maxPosts) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500 }
    );
  }
}

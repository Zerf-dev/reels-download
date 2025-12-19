import { NextRequest, NextResponse } from "next/server";

import { getInstagramUserPostsGraphQL, UserPostsResponse } from "./utils";

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
    const response = await getInstagramUserPostsGraphQL({
      username,
    });

    const status = response.status;

    if (status === 200) {
      const data = (await response.json()) as UserPostsResponse;

      console.log("GraphQL Response:", JSON.stringify(data, null, 2));

      // Try multiple response structures
      let posts: Array<{ shortcode: string; id: string; url: string }> = [];

      // Try new structure first
      if (
        data.data?.xdt_api__v1__feed__user_timeline_graphql_connection?.edges
      ) {
        posts =
          data.data.xdt_api__v1__feed__user_timeline_graphql_connection.edges
            .slice(0, 50)
            .map((edge) => ({
              shortcode: edge.node.shortcode,
              id: edge.node.id,
              url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
            }));
      }
      // Try alternative structure
      else if (data.data?.user?.edge_owner_to_timeline_media?.edges) {
        posts = data.data.user.edge_owner_to_timeline_media.edges
          .slice(0, 50)
          .map((edge) => ({
            shortcode: edge.node.shortcode,
            id: edge.node.id,
            url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
          }));
      }

      if (posts.length === 0) {
        console.error("No posts found in response structure:", data);
        return NextResponse.json(
          { error: "noPosts", message: "No posts found in response" },
          { status: 404 }
        );
      }

      return NextResponse.json({ data: posts }, { status: 200 });
    }

    if (status === 404) {
      return NextResponse.json(
        { error: "notFound", message: "user not found" },
        { status: 404 }
      );
    }

    if (status === 429 || status === 401) {
      return NextResponse.json(
        {
          error: "tooManyRequests",
          message: "too many requests, try again later",
        },
        { status: 429 }
      );
    }

    throw new Error("Failed to fetch user posts");
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500 }
    );
  }
}

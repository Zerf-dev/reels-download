import React from "react";

import { useFetch } from "@/features/api/hooks/use-fetch";

import { RequestConfigType } from "@/types/request-config";
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";

import { wrapperFetchJsonResponse } from "@/features/api/utils";

export type GetInstagramPostRequest = {
  shortcode: string;
};

export type GetInstagramPostResponse = IG_GraphQLResponseDto;

export function useGetInstagramPost() {
  const fetch = useFetch();

  return React.useCallback(
    (data: GetInstagramPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`/api/instagram/p/${data.shortcode}`, requestConfig).then(
        wrapperFetchJsonResponse<GetInstagramPostResponse>
      );
    },
    [fetch]
  );
}

export type GetInstagramUserPostsRequest = {
  username: string;
};

export type GetInstagramUserPostsResponse = {
  data: Array<{
    shortcode: string;
    id: string;
    url: string;
  }>;
  error?: string;
  message?: string;
};

export function useGetInstagramUserPosts() {
  const fetch = useFetch();

  return React.useCallback(
    (data: GetInstagramUserPostsRequest, requestConfig?: RequestConfigType) => {
      return fetch(`/api/instagram/${data.username}`, requestConfig).then(
        wrapperFetchJsonResponse<GetInstagramUserPostsResponse>
      );
    },
    [fetch]
  );
}

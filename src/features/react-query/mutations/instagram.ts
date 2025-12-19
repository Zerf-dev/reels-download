import { useMutation } from "@tanstack/react-query";

import {
  useGetInstagramPost,
  useGetInstagramUserPosts,
} from "@/features/api/requests/instagram";

export const useGetInstagramPostMutation = () => {
  const fetch = useGetInstagramPost();

  const mutation = useMutation({
    mutationFn: fetch,
    mutationKey: ["getInstagramPost"],
    retry: false,
  });

  return mutation;
};

export const useGetInstagramUserPostsMutation = () => {
  const fetch = useGetInstagramUserPosts();

  const mutation = useMutation({
    mutationFn: fetch,
    mutationKey: ["getInstagramUserPosts"],
    retry: false,
  });

  return mutation;
};

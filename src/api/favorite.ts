import request from "@/utils/request";
import { HttpRequestConfig } from "luch-request";

export function getFavoritePaginationApi(
  params: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request<Pagination>({
    method: "GET",
    url: "/favorite/pagination",
    params,
    ...options,
  });
}

export function likeApi(
  data?: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request({
    url: "/favorite/like",
    method: "POST",
    data,
    ...options,
  });
}

export function dislikeApi(
  data: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request<Pagination>({
    url: "/favorite/dislike",
    method: "POST",
    data,
    ...options,
  });
}

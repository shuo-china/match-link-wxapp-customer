import request from "@/utils/request";
import { HttpRequestConfig } from "luch-request";

export function getMbrDetailApi(
  params?: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request({
    url: "/member/detail",
    method: "GET",
    params,
    ...options,
  });
}

export function getMbrPaginationApi(
  params: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request<Pagination>({
    method: "POST",
    url: "/member/pagination",
    params,
    ...options,
  });
}

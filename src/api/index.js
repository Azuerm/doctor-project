import request from "../utlis/request";

export const getInfo = () => {
  return request({
    method: "get",
    url: "/api/user/info",
  })
}
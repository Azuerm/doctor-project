import request from "@/utlis/request.js";

export const getInfo = () => {
  return request({
    method: "get",
    url: "/api/user/info",
  })
}
export const getNumberData = () => {
  return request({
    method: 'get',
    url: '/api/docter/data'
  })
}

import request from '@/utils/request'
export function login(data) {

}

export function getInfo(token) {

}

export function logout() {

}

/**
 * 登录API
 * @param {*} data
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}

/**
 * 请求验证码
 * @param {*} rendom
 * @returns
 */
export function getCodeAPI(random) {
  return request({
    url: `user-service/user/imageCode/${random}`
  })
}

import request from 'common/js/request'

export function loginReq(username,password) {
  return request.post('./static/json/login.json',{
    loginName: users[0].username,
    loginPassword: users[0].password
  })
}
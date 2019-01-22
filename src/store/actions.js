export const saveUserName = function ({commit}, username) {
  commit('setUserName', username)
}

export const saveUserTel = function ({commit}, usertel) {
  commit('setUserTel', usertel)
}
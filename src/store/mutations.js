const mutations = {
  setUserName(state, name) {
    state.userinfo.username = name
    localStorage.setItem('zgzlgname', JSON.stringify(name))
  },
  setUserTel(state, tel) {
    state.userinfo.usertel = tel 
    localStorage.setItem('zgzlgtel', JSON.stringify(tel))
  },
  removeUserinfo(state){
    state.userinfo.username = null
    state.userinfo.usertel = null
  },
  removeStorage(state) {
    localStorage.removeItem('zgzlgname')
    localStorage.removeItem('zgzlgtel')
  },
  getStorage(state) {
    state.userinfo.username = JSON.parse(localStorage.getItem('zgzlgname'))
    state.userinfo.usertel = JSON.parse(localStorage.getItem('zgzlgtel'))
    //console.log(state.userinfo.username)
    //console.log(state.userinfo.usertel)
  },
}

export default mutations
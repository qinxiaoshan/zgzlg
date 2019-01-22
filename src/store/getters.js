const getters = {
	getStorage: function(state) {
		if (!state.userinfo.usertel) {
			state.userinfo.usertel = JSON.parse(localStorage.getItem('zgzlgtel'))
		}
		if (!state.userinfo.username) {
			state.userinfo.username = JSON.parse(localStorage.getItem('zgzlgname'))
		}
		return state.userinfo.username;
		return state.userinfo.usertel;
	}
}	

export default getters

//export const getStorage = state => state.singer

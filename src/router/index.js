import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 页面组件
import index from 'components/index'
import kszl from 'components/kszl/kszl'
import login from 'base/login/login'

//资料下载页面
import gjgwy from 'components/kszl/children/gjgwy'
import gjzj from 'components/kszl/children/gjzj'
import gqzp from 'components/kszl/children/gqzp'
import hljgwy from 'components/kszl/children/hljgwy'
import hljzj from 'components/kszl/children/hljzj'
import jszg from 'components/kszl/children/jszg'
import jszp from 'components/kszl/children/jszp'
import nxs from 'components/kszl/children/nxs'
import tgjs from 'components/kszl/children/tgjs'
import yhzp from 'components/kszl/children/yhzp'
import zonghe from 'components/kszl/children/zonghe'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index/'
		},
		{
			path: '/index/',
			component: index,
			meta:{
				title: '黑龙江中公资料馆_公职考试备考资料大全',
			}
		},
		{
			name: '资料下载',
			icon: 'el-icon-printer',
			path: '/kszl/',
			component: kszl,
			children: [
				{
					path: '/kszl/gjgwy/',
					name: '国家公务员',
					component: gjgwy,
					meta:{
						title: '国家公务员资料馆_国家公务员笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/gjzj/',
					name: '国考公安岗',
					component: gjzj,
					meta:{
						title: '国考公安岗资料馆_国考公安岗笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/gqzp/',
					name: '国企招聘',
					component: gqzp,
					meta:{
						title: '国企招聘资料馆_国企招聘笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/hljgwy/',
					name: '黑龙江公务员',
					component: hljgwy,
					meta:{
						title: '黑龙江公务员资料馆_黑龙江公务员笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/hljzj/',
					name: '黑龙江省考招警',
					component: hljzj,
					meta:{
						title: '黑龙江省考招警资料馆_黑龙江省考招警笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/jszg/',
					name: '教师资格',
					component: jszg,
					meta:{
						title: '教师资格资料馆_教师资格笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/jszp/',
					name: '教师招聘',
					component: jszp,
					meta:{
						title: '教师招聘资料馆_教师招聘笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/nxs/',
					name: '农信社',
					component: nxs,
					meta:{
						title: '农信社资料馆_农信社笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/tgjs/',
					name: '特岗教师',
					component: tgjs,
					meta:{
						title: '特岗教师资料馆_特岗教师笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/yhzp/',
					name: '银行招聘',
					component: yhzp,
					meta:{
						title: '银行招聘资料馆_银行招聘笔试/面试备考资料下载',
					}
				},
				{
					path: '/kszl/zonghe/',
					name: '综合项目',
					component: zonghe,
					meta:{
						title: '综合项目资料馆_综合项目笔试/面试备考资料下载',
					}
				},
			]
		},
		{
			path: '/login/',
			component: login,
			meta:{
				title: '资料馆登录_笔试/面试备考资料免费下载',
			}
		},
	]
})

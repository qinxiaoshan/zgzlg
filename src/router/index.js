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
			component: index
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
					component: gjgwy
				},
				{
					path: '/kszl/gjzj/',
					name: '国考公安岗',
					component: gjzj
				},
				{
					path: '/kszl/gqzp/',
					name: '国企招聘',
					component: gqzp
				},
				{
					path: '/kszl/hljgwy/',
					name: '黑龙江公务员',
					component: hljgwy
				},
				{
					path: '/kszl/hljzj/',
					name: '黑龙江省考招警',
					component: hljzj
				},
				{
					path: '/kszl/jszg/',
					name: '教师资格',
					component: jszg
				},
				{
					path: '/kszl/jszp/',
					name: '教师招聘',
					component: jszp
				},
				{
					path: '/kszl/nxs/',
					name: '农信社',
					component: nxs
				},
				{
					path: '/kszl/tgjs/',
					name: '特岗教师',
					component: tgjs
				},
				{
					path: '/kszl/yhzp/',
					name: '银行招聘',
					component: yhzp
				},
				{
					path: '/kszl/zonghe/',
					name: '综合项目',
					component: zonghe
				},
			]
		},
		{
			path: '/login/',
			component: login
		},
	]
})

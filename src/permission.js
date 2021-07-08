import router from './router'
import staticRoutes from './router/routes'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar1
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (store.state.user.permissionRouter.length === 0) {
      const url = new URL(window.location.href)
      const hash = url.hash
      const currentRoute = hash.split('#')[1]
      const getNewRoute = (staticArray, permissionArray) => {
        const newArray = []
        staticArray.forEach(item => {
          const findThing = permissionArray.find(info => {
            if (info.name === item.name) {
              return true
            }
          })
          if (findThing) {
            if (findThing.children && item.children) {
              const newArrayitem = getNewRoute(item.children, findThing.children)
              if (newArrayitem.length === 0) {
                delete item.children
              } else {
                item.children = newArrayitem
              }
              newArray.push(item)
            } else {
              newArray.push(item)
            }
          }
        })
        return newArray
      }
      const permissionArray = await store.dispatch('user/getPermission')
      const routes = getNewRoute(staticRoutes, permissionArray)
      console.log(routes)
      router.addRoutes(routes)
      next({ path: currentRoute,
        replace: true })
    }
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

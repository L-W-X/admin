
const data = [{
  path: '/example',
  //   component: () => import('@/layout'),
  redirect: '/example/table',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'el-icon-s-help'
  },
  children: [{
    path: 'table',
    name: 'Table',
    // component: () => import('@/views/table/index'),
    meta: {
      title: 'Table',
      icon: 'table'
    }
  }
  // {
  //   path: 'tree',
  //   name: 'Tree',
  //   // component: () => import('@/views/tree/index'),
  //   meta: {
  //     title: 'Tree',
  //     icon: 'tree'
  //   }
  // }
  ]
},

{
  path: '/form',
  //   component: () => import('@/layout'),
  children: [{
    path: 'index',
    name: 'Form',
    // component: () => import('@/views/form/index'),
    meta: {
      title: 'Form',
      icon: 'form'
    }
  }]
},

{
  path: '/nested',
  //   component: () => import('@/layout'),
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'Nested',
    icon: 'nested'
  },
  children: [{
    path: 'menu1',
    // component: () => import('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: {
      title: 'Menu1'
    },
    children: [{
      path: 'menu1-1',
      //   component: () => import('@/views/nested/menu1/menu1-1'),
      name: 'Menu1-1',
      meta: {
        title: 'Menu1-1'
      }
    },
    {
      path: 'menu1-2',
      //   component: () => import('@/views/nested/menu1/menu1-2'),
      name: 'Menu1-2',
      meta: {
        title: 'Menu1-2'
      },
      children: [{
        path: 'menu1-2-1',
        // component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        name: 'Menu1-2-1',
        meta: {
          title: 'Menu1-2-1'
        }
      },
      {
        path: 'menu1-2-2',
        // component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        name: 'Menu1-2-2',
        meta: {
          title: 'Menu1-2-2'
        }
      }
      ]
    },
    {
      path: 'menu1-3',
      //   component: () => import('@/views/nested/menu1/menu1-3'),
      name: 'Menu1-3',
      meta: {
        title: 'Menu1-3'
      }
    }
    ]
  },
  {
    path: 'menu2',
    // component: () => import('@/views/nested/menu2/index'),
    name: 'Menu2',
    meta: {
      title: 'menu2'
    }
  }
  ]
},

{
  path: 'external-link',
  //   component: () => import('@/layout'),
  children: [{
    path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    meta: {
      title: 'External Link',
      icon: 'link'
    }
  }]
}
]

module.exports = [
  {
    url: '/vue-admin-template/user/permission',
    type: 'get',
    response: config => {
      const items = data
      return {
        code: 20000,
        data: {
          total: items.length,
          permission: items
        }
      }
    }
  }
]

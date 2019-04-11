import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home'),
      meta: [{
        text: '首页',
        path: '/'
      }],
      children: [{
        path: '/pheno/:cid?/:sid?/:pid?',
        name: 'Pheno',
        component: () => import('@/components/Pheno'),
        meta: [{
          text: '表型管理',
          path: '/pheno'
        }]
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('@/components/Article'),
        meta: [{
          text: '表型管理',
          path: '/pheno'
        }, {
          text: '录入图文',
          path: '/article'
        }]
      },
      {
        path: '/phenoRules/:id',
        name: 'PhenoRules',
        component: () => import('@/components/PhenoRules'),
        meta: [{
          text: '表型管理',
          path: '/pheno'
        }, {
          text: '录入规则',
          path: '/phenoRules'
        }]
      },
      {
        path: '/chatbot/:id',
        name: 'Chatbot',
        component: () => import('@/components/Chatbot'),
        meta: [{
          text: '表型管理',
          path: '/pheno'
        }, {
          text: '聊天机器人',
          path: '/chatbot'
        }]
      },
      {
        path: '/drug/:cid?/:mid?/:eid?',
        name: 'Drug',
        component: () => import('@/components/Drug'),
        meta: [{
          text: '药物成分',
          path: '/drug'
        }]
      },
      {
        path: '/drugRules/:id',
        name: 'DrugRules',
        component: () => import('@/components/DrugRules'),
        meta: [{
          text: '药物成分',
          path: '/drug'
        }, {
          text: '成分规则',
          path: '/drugRules'
        }]
      },
      {
        path: '/medicine/:fid?/:sid?/:nid?',
        name: 'Medicine',
        component: () => import('@/components/Medicine'),
        meta: [{
          text: '药物商品',
          path: '/medicine'
        }]
      },
      {
        path: '/disease/:cid?/:sid?/:pid?',
        name: 'Disease',
        component: () => import('@/components/Disease'),
        meta: [{
          text: '疾病管理',
          path: '/disease'
        }]
      },
      {
        path: '/diseaseArticle/:id',
        name: 'DiseaseArticle',
        component: () => import('@/components/DiseaseArticle'),
        meta: [{
          text: '疾病管理',
          path: '/disease'
        }, {
          text: '录入图文',
          path: '/diseaseArticle'
        }]
      },
      {
        path: '/diseaseRules/:id',
        name: 'DiseaseRules',
        component: () => import('@/components/DiseaseRules'),
        meta: [{
          text: '疾病管理',
          path: '/disease'
        }, {
          text: '录入规则',
          path: '/diseaseRules'
        }]
      },
      {
        path: '/inherit/:cid?/:sid?/:pid?',
        name: 'Inherit',
        component: () => import('@/components/Inherit'),
        meta: [{
          text: '遗传筛查',
          path: '/inherit'
        }]
      },
      {
        path: '/inheritRules/:id',
        name: 'InheritRules',
        component: () => import('@/components/InheritRules'),
        meta: [{
          text: '药物成分',
          path: '/drug'
        }, {
          text: '成分规则',
          path: '/InheritRules'
        }]
      },
      {
        path: '/inheritArticle/:id',
        name: 'InheritArticle',
        component: () => import('@/components/InheritArticle'),
        meta: [{
          text: '表型管理',
          path: '/inherit'
        }, {
          text: '录入图文',
          path: '/InheritArticle'
        }]
      },
      {
        path: '/pmSearch',
        name: 'PmSearch',
        component: () => import('@/components/PmSearch'),
        meta: [{
          text: '遗传筛查',
          path: '/pmSearch'
        }]
      }]
    }
  ]
})

import App from '../App';

const Signin = () => import(/* webpackChunkName: "signin" */ '@/pages/signin/Signin');
const Agreement = () => import(/* webpackChunkName: "service" */ '@/pages/agreement/Agreement');
const Service = () => import(/* webpackChunkName: "service" */ '@/pages/service/Service');
const ServiceList = () => import('@/pages/service/children/List');
const ServiceViewPolicy = () => import('@/pages/service/children/ViewPolicy');
const ServiceIntroduction = () => import('@/pages/service/children/Introduction');
const Apply = () => import('@/pages/service/children/Apply');
const ApplySuccess = () => import('@/pages/service/children/Success');
const ApplyUpload = () => import('@/pages/service/children/Upload');
const User = () => import('@/pages/user/User');
const Account = () => import('@/pages/user/children/Account');
const Verify = () => import('@/pages/user/children/Verify');
const ChangePhone = () => import('@/pages/user/children/ChangePhone');
const Order = () => import('@/pages/order/Order');
const OrderList = () => import('@/pages/order/children/List');
const OrderDetail = () => import('@/pages/order/children/Detail');
const TijianOrderDetail = () => import('@/pages/order/children/TijianDetail');
const OrderComment = () => import('@/pages/order/children/Comment');
const CommentDetail = () => import('@/pages/order/children/CommentDetail');
const News = () => import('@/pages/news/News');
const NewsList = () => import('@/pages/news/children/List');
const NewsDetail = () => import('@/pages/news/children/Detail');
const Consult = () => import('@/pages/consult/Consult');

/*电话医生-用户版*/
const TelDoctor = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/TelDoctor');
const TelDoctorHome = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Home');
const TelDoctorSignin = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Signin');
const TelDoctorApply = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Apply');
const TelDoctorReturnApply = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/ReturnApply');
const TelDoctorSuccess = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Success');
const TelDoctorPayment = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Payment');
const TelDoctorPaysuccess = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Paysuccess');
const TelDoctorActive = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Active');
const TelDoctorTeam = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Team');
const TelDoctorTeamDetail = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/TeamDetail');
const TelDoctorEvaluation = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Evaluation');
const TelDoctorPerson = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/Person');
const TelDoctorPersonOrder = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/person_order/PersonOrder');
const TelDoctorPersonOrderDetail = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/person_order/children/Detail');
const TelDoctorPersonOrderComment = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/person_order/children/Comment');
const TelDoctorPersonOrderDoctorOrderList = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/person_order/children/DoctorOrderList');

// 华泰调用页面
const huataiTelDoctor = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/huatai/huatai-apply');
const huataiTelDoctorSuccess = () => import(/* webpackChunkName: "teldoctor" */ '@/pages/teldoctor/children/huatai/huatai-success');
export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: 'service',
        meta: {auth: true},
      },
      {
        path: 'signin',
        name: 'Signin',
        component: Signin,
        meta: {auth: true},
      },
      {
        path: '/agreement',
        name: 'Agreement',
        component: Agreement,
        meta: {auth: true},
      },
      {
        path: 'consult',
        name: 'Consult',
        component: Consult,
        meta: {auth: true},
      },
      {
        path: 'service',
        component: Service,
        children: [
          {
            path: '',
            redirect: 'list'
          },
          {
            path: 'list',
            name: 'ServiceList',
            component: ServiceList,
            meta: {auth: true},
          },
          {
            path: 'view-policy/:type',
            name: 'ViewPolicy',
            component: ServiceViewPolicy,
            meta: {auth: true},
          },
          {
            path: 'introduction/:type',
            name: 'Introduction',
            component: ServiceIntroduction,
            meta: {auth: true},
          },
          {
            path: 'apply/:type/:service/:followProductId',
            name: 'Apply',
            component: Apply,
            meta: {auth: true},
          },
          {
            path: 'success/:id',
            name: 'Success',
            component: ApplySuccess,
            meta: {auth: true},
          },
          {
            path: 'upload/:id',
            name: 'Upload',
            component: ApplyUpload,
            meta: {auth: true},
          }
        ]
      },
      {
        path: 'user',
        component: User,
        children: [
          {
            path: '',
            redirect: 'account',
            meta: {auth: true},
          },
          {
            path: 'account',
            name: 'Account',
            component: Account,
            meta: {auth: true},
          },
          {
            path: 'verify',
            name: 'Verify',
            component: Verify,
            meta: {auth: true},
          },
          {
            path: 'changephone',
            name: 'ChangePhone',
            component: ChangePhone,
            meta: {auth: true},
          },
        ]
      },
      {
        path: 'order',
        component: Order,
        meta: {auth: true},
        children: [
          {
            path: '',
            redirect: 'list'
          },
          {
            path: 'list',
            name: 'OrderList',
            component: OrderList,
            meta: {auth: true},
          },
          {
            path: 'detail/:id',
            name: 'OrderDetail',
            component: OrderDetail,
            meta: {auth: true},
          },
          {
            path: 'tijiandetail/:id',
            name: 'TijianOrderDetail',
            component: TijianOrderDetail,
            meta: {auth: true},
          },
          {
            path: 'comment/:id',
            name: 'Comment',
            component: OrderComment,
            meta: {auth: true},
          },
          {
            path: 'commentdetail/:id',
            name: 'CommentDetail',
            component: CommentDetail,
            meta: {auth: true},
          }
        ]
      },
      {
        path: 'news',
        component: News,
        meta: {auth: true},
        children: [
          {
            path: '',
            redirect: 'list'
          },
          {
            path: 'list',
            name: 'NewsList',
            component: NewsList
          },
          {
            path: 'detail',
            name: 'NewsDetail',
            component: NewsDetail
          }
        ]
      },
      {
        path: 'teldoctor',
        component: TelDoctor,
        meta: {auth: true},
        children: [
          {
            path: '',
            redirect: 'home'
          },
          {
            path: 'home',
            name: 'TelDoctorHome',
            component: TelDoctorHome,
            meta: {auth: true},
          },
          {
            path: 'signin',
            name: 'TelDoctorSignin',
            component: TelDoctorSignin,
            meta: {auth: true},
          },
          {
            path: 'apply',
            name: 'TelDoctorApply',
            component: TelDoctorApply,
            meta: {auth: true},
          },
          {
            path: 'return-apply',
            name: 'TelDoctorReturnApply',
            component: TelDoctorReturnApply,
            meta: {auth: true},
          },
          {
            path: 'success',
            name: 'TelDoctorSuccess',
            component: TelDoctorSuccess,
            meta: {auth: true},
          },
          {
            path: 'payment',
            name: 'TelDoctorPayment',
            component: TelDoctorPayment,
            meta: {auth: true},
          },
          {
            path: 'paysuccess',
            name: 'TelDoctorPaysuccess',
            component: TelDoctorPaysuccess,
            meta: {auth: true},
          },
          {
            path: 'active',
            name: 'TelDoctorActive',
            component: TelDoctorActive,
            meta: {auth: true},
          },
          {
            path: 'team',
            name: 'TelDoctorTeam',
            component: TelDoctorTeam,
            meta: {auth: true},
          },
          {
            path: 'team-detail',
            name: 'TelDoctorTeamDetail',
            component: TelDoctorTeamDetail,
            meta: {auth: true},
          },
          {
            path: 'evaluation',
            name: 'TelDoctorEvaluation',
            component: TelDoctorEvaluation,
            meta: {auth: true},
          },
          {
            path: 'person',
            name: 'TelDoctorPerson',
            component: TelDoctorPerson,
            meta: {auth: true},
          },
          {
            path: 'person-order',
            component: TelDoctorPersonOrder,
            meta: {auth: true},
            children: [
              {
                path: '',
                redirect: 'detail'
              },
              {
                path: 'detail',
                name: 'TelDoctorPersonOrderDetail',
                component: TelDoctorPersonOrderDetail,
                meta: {auth: true},
              },
              {
                path: 'comment',
                name: 'TelDoctorPersonOrderComment',
                component: TelDoctorPersonOrderComment,
                meta: {auth: true},
              },
              {
                path: 'doctor-order-list',
                name: 'TelDoctorPersonOrderDoctorOrderList',
                component: TelDoctorPersonOrderDoctorOrderList,
                meta: {auth: true},
              }
            ]
          },
          // 华泰调用页面
          {
            path: 'huataiTelDoctor',
            name: 'huataiTelDoctor',
            component: huataiTelDoctor,
            meta: {auth: true},
          },
          {
            path: 'huataiTelDoctorSuccess/:open_id',
            name: 'huataiTelDoctorSuccess',
            component: huataiTelDoctorSuccess,
            meta: {auth: true},
          },
        ]
      }
    ]
  }
];

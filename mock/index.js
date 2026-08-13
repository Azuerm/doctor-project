export default {
  'GET /api/user/info': {
    code: 200,
    msg: 'success',
    data: [
      {
        id: 1,
        name: '张三',
        mobile: '13800138000',
        desc: '我是张三,我是一个学生,我来自中国',
      },
      {
        id: 2,
        name: '李四',
        mobile: '13800138001',
        desc: '我是李四,我是一个学生,我来自中国',
      },
      {
        id: 3,
        name: '王五',
        mobile: '13800138002',
        desc: '我是王五,我来自中国,我来自中国',
      },
      {
        id: 4,
        name: '赵六',
        mobile: '13800138003',  
        desc: '我是赵六,我来自中国,我来自中国',
      },
    ],
  },

  'POST /api/user/login': {
    code: 0,
    msg: '登录成功',
    data: {
      token: 'mock-token-123456',
    },
  },

  'GET /api/doctor/list': {
    code: 0,
    msg: 'ok',
    data: [
      { id: 1, name: '王医生', department: '内科', level: '主任医师' },
      { id: 2, name: '李医生', department: '外科', level: '副主任医师' },
      { id: 3, name: '赵医生', department: '儿科', level: '主治医师' },
    ],
  },

  'POST /api/order/create': (body) => ({
    code: 0,
    msg: '预约成功',
    data: {
      orderId: Date.now(),
      ...body,
    },
  }),
}
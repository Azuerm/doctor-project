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
  'GET /api/docter/data':{
    code: 200,
    msg: 'success',
    data:[
      {
        number:3300,
        text:'今日就诊人数',
      },
      {
        number: 211100,
        text: '今日预约人数',
      },
      {
        number: 300,
        text: '今日挂号人数',
      },
      {
        number: 11100,
        text: '今日问诊人数',
      }, 
      {
        number: 100,
        text: '今日挂号人数',
      },
      {
        number: 10000,
        text: '今日挂号人数',
      },
    ],
    time: '1786579200000'
  },
  'GET /api/area':{
    code: 200,
    msg: 'success',
    data:[
      {
        high: [
          {
            name: '浙江省',
            desc: '是中国的一个省份，位于中国东部，与江苏省、安徽省、福建省相邻。',
          },
          {
            name: '江苏省',
            desc: '是中国的一个省份，位于中国东部，与浙江省、安徽省、福建省相邻。',
          },
        ],
        middle: [
          {
            name: '杭州市',
            desc: '是中国浙江省的一个城市，位于中国东部，与上海市、宁波市相邻。',
          },
          {
            name: '宁波市',
            desc: '是中国浙江省的一个城市，位于中国东部，与杭州市、温州市相邻。',
          },
          {
            name: '温州市',
            desc: '是中国浙江省的一个城市，位于中国东部，与宁波市、宁波市相邻。',
          },
          {
            name: '宁波市',
            desc: '是中国浙江省的一个城市，位于中国东部，与温州市、宁波市相邻。',
          },
        ],
      }
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

  'GET /api/province': (body) => ({
    code: 200,
    msg: 'success',
    data: [
      { provincearea: '北京市', worknum: '8200', kidnum: '760' },
      { provincearea: '天津市', worknum: '300', kidnum: '480' },
      { provincearea: '河北省', worknum: '21500', kidnum: '1860' },
      { provincearea: '山西省', worknum: '13800', kidnum: '1120' },
      { provincearea: '内蒙古自治区', worknum: '9600', kidnum: '740' },
      { provincearea: '辽宁省', worknum: '15700', kidnum: '1280' },
      { provincearea: '吉林省', worknum: '8700', kidnum: '690' },
      { provincearea: '黑龙江省', worknum: '11200', kidnum: '890' },
      { provincearea: '上海市', worknum: '9800', kidnum: '920' },
      { provincearea: '江苏省', worknum: '26800', kidnum: '2150' },
      { provincearea: '浙江省', worknum: '22400', kidnum: '1680' },
      { provincearea: '安徽省', worknum: '100', kidnum: '1560' },
      { provincearea: '福建省', worknum: '17600', kidnum: '1320' },
      { provincearea: '江西省', worknum: '2', kidnum: '1040' },
      { provincearea: '山东省', worknum: '28600', kidnum: '2310' },
      { provincearea: '河南省', worknum: '26500', kidnum: '2460' },
      { provincearea: '湖北省', worknum: '4', kidnum: '1450' },
      { provincearea: '湖南省', worknum: '17400', kidnum: '1380' },
      { provincearea: '广东省', worknum: '31200', kidnum: '2670' },
      { provincearea: '广西壮族自治区', worknum: '14300', kidnum: '1210' },
      { provincearea: '海南省', worknum: '3200', kidnum: '260' },
      { provincearea: '重庆市', worknum: '100', kidnum: '860' },
      { provincearea: '四川省', worknum: '21700', kidnum: '1890' },
      { provincearea: '贵州省', worknum: '10200', kidnum: '930' },
      { provincearea: '云南省', worknum: '11600', kidnum: '1010' },
      { provincearea: '西藏自治区', worknum: '860', kidnum: '70' },
      { provincearea: '陕西省', worknum: '13700', kidnum: '1080' },
      { provincearea: '甘肃省', worknum: '8900', kidnum: '770' },
      { provincearea: '青海省', worknum: '2100', kidnum: '180' },
      { provincearea: '宁夏回族自治区', worknum: '2400', kidnum: '210' },
      { provincearea: '新疆维吾尔自治区', worknum: '7600', kidnum: '640' },
      { provincearea: '台湾省', worknum: '3900', kidnum: '310' },
      { provincearea: '香港特别行政区', worknum: '2900', kidnum: '230' },
      { provincearea: '澳门特别行政区', worknum: '420', kidnum: '35' },
    ],
  }),
}
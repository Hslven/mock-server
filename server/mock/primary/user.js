const Mock = require('mockjs');
const Random = Mock.Random;

module.exports = [
  {
    // 获取用户信息
    url: '/api/user/info',
    methods: 'get',
    response() {
      return {
        error: 0,
        data: {
          username: Random.title(),
          nickname: Random.cname(),
        },
        msg: 'success',
      };
    },
  },
  {
    // 注册用户信息
    url: '/api/user/register',
    methods: 'post',
    response() {
      return {
        error: 0,
        data: {
          username: Random.title(),
        },
        msg: 'success',
      };
    },
  },
  {
    // 登录
    url: '/api/user/login',
    methods: 'post',
    response() {
      return {
        error: 0,
        data: {
          token: Random.word(20),
        },
        msg: 'success',
      };
    },
  },
];

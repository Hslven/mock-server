const Mock = require('mockjs');
const Random = Mock.Random;
const { getQuestionList } = require('../data/getQuestionList');

module.exports = [
  // 获取单个文件信息
  {
    url: '/api/question/:id',
    methods: 'get',
    response: () => {
      return {
        error: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
  // 获取查询问卷列表
  {
    url: '/api/question',
    methods: 'get',
    response: (ctx) => {
      // const isStar = ctx.url.includes('isStar=true');
      // const isDeleted = ctx.url.includes('isDeleted=true');
      const {
        isStar = false,
        isDeleted = false,
        page = 1,
        pageSize = 10,
      } = ctx.query;
      return {
        error: 0,
        data: {
          list: getQuestionList({ isStar, isDeleted, len: pageSize }), // 当前页
          total: 100, // 分页
        },
        msg: 'success',
      };
    },
  },
  // 创建问卷
  {
    url: '/api/question',
    methods: 'post',
    response: () => {
      return {
        error: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
        msg: 'success',
      };
    },
  },
  // 删除
  {
    url: '/api/question',
    methods: 'delete',
    response: () => {
      return {
        error: 0,
        data: {
          ids: [],
        },
        msg: 'success',
      };
    },
  },
  // 更新问卷
  {
    url: '/api/question/:id',
    methods: 'put',
    response: () => {
      return {
        error: 0,
        data: {},
        msg: 'success',
      };
    },
  },
  // 复制问卷
  {
    url: '/api/question/duplicate/:id',
    methods: 'post',
    response: () => {
      return {
        error: 0,
        data: {
          id: Random.id(),
        },
        msg: 'success',
      };
    },
  },
];

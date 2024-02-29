/*
 * 获取列表分页数据
 */
const Mock = require('mockjs');
const Random = Mock.Random;
function getQuestionList(opt = {}) {
  const list = [];
  const { len, isDeleted = false, isStar = false } = opt;
  for (let i = 0; i < len; i++) {
    list.push({
      id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      answerCount: Random.natural(50, 1000),
      createdAt: Random.datetime(),
      isDeleted,
      isStar,
    });
  }
  return list;
}
module.exports = { getQuestionList };

const Mock = require('mockjs');
    const Random = Mock.Random;
    module.exports = [
  {
    "url": "lohost:3000/api",
    "methods": "GET",
    "response": "(ctx) => {return\"\"}"
  },
  {
    "url": "/eal",
    "methods": "GET",
    "response": "(ctx) => {return\"\"}"
  },
  {
    "url": "/eeea",
    "methods": "GET",
    "response": "(ctx) => {return\"return {\\r\\n    \\r\\n}\"}"
  },
  {
    "url": "/eee",
    "methods": "GET",
    "response": "(ctx) => {return\"return {\\r\\n    1231:123\\r\\n}\"}"
  },
  {
    "url": "",
    "methods": "GET",
    "response": "(ctx) => {return\"return {\\r\\n    s:123\\r\\n}\"}"
  }
]
    
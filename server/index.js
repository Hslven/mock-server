const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mockList = require("./mock").flat();
const app = new Koa();
const router = new Router({
  prefix: "/v1",
});
const cors = require("koa2-cors");
app.use(
  cors({
    origin: function (ctx) {
      return ctx.header.origin;
    }, // 允许发来请求的域名
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 设置所允许的 HTTP请求方法
    credentials: true, // 标示该响应是合法的
  }),
);

function loadGetRes(fn, ctx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    //   const res = fn(ctx);
      const res = eval(fn)(ctx);
      resolve(res);
    }, 500);
  });
}

mockList.forEach((item) => {
  // console.log(item)
  const { url, methods, response } = item;
  // router[methods]就类似于 router.get、 router.post，是一个很好的封装方法
  methods &&
    router[methods.toLowerCase()](url, async (ctx) => {
      // console.log(ctx)
      return new Promise((resolve, reject) => {
        loadGetRes(response, ctx).then((res) => {
          ctx.body = res;
          resolve(res);
        });
      });
      // 模拟网络请求的加载状态，1s
      // await 等他执行完，再执行下面的代码
      // const res = await loadGetRes(response);
      // ctx.body = res;
    });
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// app.listen(3001, () => {
//   console.log("localhost:3001 mock server is running...");
// });
app.listen(32024, () => {
  console.log("localhost:32024/v1");
});

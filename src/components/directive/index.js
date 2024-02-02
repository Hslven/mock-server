import method from "./method";
const install = function (Vue) {
	// 请求类型盒子变化
	Vue.directive("method", method);
};

export default install;

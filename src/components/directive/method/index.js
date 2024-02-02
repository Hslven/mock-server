/**
 * v-method 元素传入类型不同背景色不同
 * @param {String} type - GET/POST/PUT/DELETE/PATCH
 * Copyright (c) 2023   2023 lven
 * @example v-method="{your type}"
 */
// 


 const method = (el, binding, _vnode) => {
    const arg = binding.value || 'get';
    Object.assign(el.style, {
        padding: "0px 4px",
        fontSize: "12px",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: "6px",
        ...methodType(arg),
    });
    // 将文本delete转换为DEL
    el.innerText = ('delete' || 'DELETE') ? 'DEL' : arg;

};
export default method
function methodType(state) {
    switch (state) {
        case "get":
        case "GET":
            return { background: "#5692b3" };
        case "post":
        case "put":
        case "POST":
        case "PUT":
            return { background: '#679a73' };
        case "del":
        case "DEL":
        case "delete":
        case "DELETE":
            return { background: "#c56767" };
    }
}

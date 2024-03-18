import { createI18n } from "vue-i18n";

const messages = {
  en: {
    button: {
        new: "New",
        run: "Run",
        delete: "Delete",
      },
      message: {
        hello: 'hello'
      }
  },
  zh: {
    button: {
      new: "新建",
      run: "启动",
      delete: "删除",
    },

  },
};

const i18n = createI18n({
  locale: "en", // 设置默认语言
  messages,
});

export default i18n;

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/base.scss";`,
      },
    },
  },
};
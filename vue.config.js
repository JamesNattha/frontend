// const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
//   configureWebpack: {
//     resolve: {
//       alias: {
//         "@api": path.resolve(__dirname, "src/_api"), // สร้าง alias สำหรับโฟลเดอร์ _api
//       },
//     },
//   },
// });

const path = require("path");

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@_api": path.resolve(__dirname, "src/_api"),
      },
    },
  },
};

const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/antdCustom.less",
  webpack(config) {
    return config;
  }
});

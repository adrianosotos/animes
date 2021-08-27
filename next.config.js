const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./styles/styles.less",
  webpack(config) {
    return config;
  }
});

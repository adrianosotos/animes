module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['*']
  },
  exportTrailingSlash: true,
}

const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const path =  require('path');
const withPlugins = require('next-compose-plugins');
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const themeVariable =  lessToJs(fs.readFileSync(path.join(__dirname, './styles/antd.less'), 'utf8'));

const nextConfig = {}

module.exports = withPlugins(
    [
        [
            withLess({
                lessLoaderOptions: {
                    javascriptEnabled: true,
                    modifyVars: themeVariable,
                },
                webpack: (config, {isServer}) => {
                    if (isServer) {
                        const antStyles = /antd\/.*?\/style.*?/;
                        const origExternals = [...config.externals];
                        config.externals = [
                            (context, request, callback) => {
                                if (request.match(antStyles)) return callback();
                                if (typeof origExternals[0] === "function") {
                                    origExternals[0](context, request, callback);
                                } else {
                                    callback();
                                }
                            },
                            ...(typeof origExternals[0] === "function" ? [] : origExternals),
                        ];

                        config.module.rules.unshift({
                            test: antStyles,
                            use: "null-loader",
                        });
                    }
                    // config.resolve.alias["relay"] = path.join(
                    //     __dirname,
                    //     "__generated__",
                    //     "relay"
                    // );
                    return config;
                }
            }),
        ],
        [withCSS],
    ],
    { webpack5: false, }
)
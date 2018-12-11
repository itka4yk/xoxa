const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
    getTransformModulePath() {
        return require.resolve("react-native-typescript-transformer");
    },
    getSourceExts() {
        return ["ts", "tsx"];
    },
    resolver: {
        blacklistRE: blacklist([
            /node_modules\/.*\/node_modules\/react-native\/.*/,
        ])
    },
};
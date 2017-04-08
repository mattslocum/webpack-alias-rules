const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js'
    },
    resolve: {
        modules: [
            "./",
            "node_modules"
        ],
        alias: {
            "my_cool_lib": "src/cool-lib"
        }
    },
    module: {
        rules: [{
            test: /my_cool_lib/,
            // test: /cool-lib/, // works with this one, but I need to use alias
            use: [{
                loader: 'exports-loader',
                options: 'MyCoolLib'
            }]
        }]
    }
};

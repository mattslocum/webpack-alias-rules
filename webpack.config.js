const path = require('path');
const ruleAlias = new (require("./RuleAliasPlugin"))();

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
            // test: /my_cool_lib/,
            test: ruleAlias.match('my_cool_lib'),
            use: [{
                loader: 'exports-loader',
                options: 'MyCoolLib'
            }]
        }]
    },
    plugins: [
        ruleAlias
    ]
};

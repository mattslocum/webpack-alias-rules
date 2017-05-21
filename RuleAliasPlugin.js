"use strict";
/**
 * Webpack supports aliases and rules as core functionality, but unfortunately they aren't fully
 * compatible with each other. If you alias a file, you can't use that alias in rules. This
 * plugin fixes that problem by storing a copy of the aliases, and then exposing a match function
 * so you can use those aliases during your rule match test.
 *
 * Usage:
 *   1. new up this class outside of the webpack plugin's array.
 *   2. in a rule: `test: <instance_name>.match('<alias_name>')`
 *   3. register the plugin in the plugins array by simply adding the instance
 *
 * Example:
 *   https://github.com/mattslocum/webpack-alias-rules/blob/plugin/webpack.config.js
 */

class RuleAliasPlugin {
    match(aliasName) {
        return (resourcePath) => {
            // Use the aliases map to identify rule matching
            // TODO: is indexOf too loose?
            return resourcePath.indexOf(this.aliases[aliasName]) != -1;
        }
    }

    apply(compiler) {
        // Get the list of aliases after the resolvers since it is before the rules run.
        compiler.plugin("after-resolvers", () => {
            this.aliases = compiler.options.resolve.alias;
        });
    }
}

module.exports = RuleAliasPlugin;

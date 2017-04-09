"use strict";

class RuleAliasPlugin {
    match(aliasName) {
        return (resourcePath) => {
            // TODO: is indexOf too loose?
            return resourcePath.indexOf(this.aliases[aliasName]) != -1;
        }
    }

    apply(compiler) {
        compiler.plugin("after-resolvers", () => {
            this.aliases = compiler.options.resolve.alias;
        });
    }
}

module.exports = RuleAliasPlugin;

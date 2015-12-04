
function LessPluginAssert(options) {
    this.options = options;
}

LessPluginAssert.prototype = {
    install: function(less, pluginManager) { // jshint unused: false
        less.functions.functionRegistry
            .addMultiple(require("./functions")(less));
    }
};

module.exports = LessPluginAssert;

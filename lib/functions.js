
module.exports = function(less) {

    var tree       = less.tree,
        Expression = tree.Expression,
        Value      = tree.Value,
        Node       = tree.Node,
        isArray    = Array.isArray;

    // ........................................................

    function newLessList(list, type) {
        var ReturnType = (type === "Expression")
            ? Expression : Value;
        return new ReturnType(list);
    }

    // ........................................................



    // ........................................................

    function atKey(list, index) {
        if (!isArray(list.value))
            return;

        // see docs/impl-notes.md#at-1
        list = (!isArray(list.value[0].value) &&
            (list.type === "Expression"))
                ? [list] : list.value;

        var pair, type, key;
        for (var i = 0; i < list.length; i++) {
            pair = list[i];
            // return empty thing if value is missing but key matches:
            if (!isArray(pair) &&
                (Node.compare(index, pair) === 0))
                    return new Node();

            type = pair.type;
            pair = pair.value;
            key  = pair[0];
            if (Node.compare(index, key) === 0)
                return (pair.length < 2) ? pair[1]
                    : newLessList(pair.slice(1), type);
        }
    }


// ............................................................

    var functions = {

        // ....................................................

        at: function(list, index) {
            if ((index.type !== "Dimension") ||
                 !index.unit.isEmpty())
                    return atKey(list, index);

            list = isArray(list.value)
                ? list.value : [list];
            return list[index.value - 1];
        },

        assert: function(condition,message) {
            if ( !condition ) {
                throw new Error(message);
            } else {
                return true;
            }
        },

        fail: function(message) {
            throw new Error(message);
        }


        // ....................................................

    };

    return functions;

// ............................................................

};

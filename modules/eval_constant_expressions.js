const types = require("@babel/types")
const iBabel = require('../class/iBabel')

function eval_constant_expressions (code) {

    let babel = new iBabel(code)

    babel.traverse({
        "BinaryExpression|UnaryExpression": function (path) {
            const { confident, value } = path.evaluate()
            if (!confident) {
                return;
            }
            const actualVal = types.valueToNode(value)
            path.replaceWith(actualVal)
            path.skip()
        }
    })

    return babel.generate()

}

module.exports = eval_constant_expressions

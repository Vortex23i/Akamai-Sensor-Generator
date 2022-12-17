const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generate = require("@babel/generator").default
const beautify = require("js-beautify").js

class iBabel {

    #ast

    constructor(code) {

        this.#ast = parser.parse(code)
    }

    traverse(obj) {

        traverse(this.#ast, obj)
    }

    generate(minified = false) {

        const result = generate(this.#ast, { minified: minified }).code
        if (minified) {
            return result
        }
        return beautify(result, { indent_size: 2, space_in_empty_paren: true })
    }

}

module.exports = iBabel

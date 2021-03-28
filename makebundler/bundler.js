const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const babel = require("@babel/core");
const traverse = require("@babel/traverse").default;

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename); // ./src
      const newFile = "./" + path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  console.log(dependencies, code);
  return {
    filename,
    dependencies,
  };
};

moduleAnalyser("./src/index.js");

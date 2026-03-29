const fs = require("fs").promises
const recast = require("recast")
const { builders } = recast.types
const { exec } = require("child_process")

async function readExportedExpression(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8")
    // Parse the code into an AST
    const ast = recast.parse(data, {
      parser: require("recast/parsers/babel"),
    })

    const moduleExportsAssignment = ast.program.body.find(
      (node) =>
        node.type === "ExpressionStatement" &&
        node.expression.type === "AssignmentExpression" &&
        node.expression.left.type === "MemberExpression"
    )
    let exportedObject = moduleExportsAssignment.expression.right

    if (
      exportedObject.type === "ArrowFunctionExpression" ||
      exportedObject.type === "FunctionExpression"
    ) {
      exportedObject = exportedObject.body
    }

    return { ast, exportedObject }
  } catch (err) {
    console.error("fail reading exported expression ", err.message)
  }
}

async function addMethodToModule(filePath, methodName, method) {
  try {
    const { ast, exportedObject } = await readExportedExpression(filePath)

    exportedObject.properties.push(
      builders.objectProperty(
        builders.identifier(methodName),
        functionToObject(method)
      )
    )

    await applyChangesToFile(filePath, ast)
  } catch (error) {
    console.error(error.message)
  }
}

async function applyChangesToFile(filePath, ast) {
  const modifiedCode = recast.prettyPrint(ast).code

  await fs.writeFile(filePath, modifiedCode, "utf8")
  exec(`code ${filePath}`)
}

async function addObjectToArray(filePath, object, fn) {
  const { ast, exportedObject } = await readExportedExpression(filePath)

  let arrayElements = exportedObject.elements
  if (typeof fn === "function") arrayElements = fn(exportedObject)

  arrayElements.push(objectToObjectExpression(object))
  await applyChangesToFile(filePath, ast)
}

function objectToObjectExpression(obj) {
  if (Array.isArray(obj)) {
    // If the value is an array, recursively convert its elements
    const elements = obj.map((value) => objectToObjectExpression(value))
    return builders.arrayExpression(elements)
  }

  if (typeof obj !== "object") {
    // If the value is a string, number, or boolean, create an Identifier or Literal
    return typeof obj === "string"
      ? builders.stringLiteral(obj)
      : typeof obj === "number"
      ? builders.numericLiteral(obj)
      : builders.booleanLiteral(obj)
  } else {
    // If the value is an object, recursively convert its properties
    const properties = Object.entries(obj).map(([key, value]) =>
      builders.objectProperty(
        builders.identifier(key),
        objectToObjectExpression(value)
      )
    )

    return builders.objectExpression(properties)
  }
}
async function modifyFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8")
    // Parse the code into an AST
    const ast = recast.parse(data, {
      parser: require("recast/parsers/babel"),
    })

    const moduleExportsAssignment = ast.program.body.find(
      (node) =>
        node.type === "ExpressionStatement" &&
        node.expression.type === "AssignmentExpression" &&
        node.expression.left.type === "MemberExpression"
    )
    let exportedObject = moduleExportsAssignment.expression.right

    if (
      exportedObject.type === "ArrowFunctionExpression" ||
      exportedObject.type === "FunctionExpression"
    ) {
      exportedObject = exportedObject.body
    }

    // exportedObject.properties.push(addMethod("newMethod"));
    // exportedObject.properties.push(
    //   addFunctionProperty("newFunctionProperty", [
    //     builders.expressionStatement(
    //       builders.callExpression(
    //         builders.memberExpression(
    //           builders.identifier("console"),
    //           builders.identifier("log")
    //         ),
    //         [builders.stringLiteral("Customized function called")]
    //       )
    //     ),
    //   ])
    // );
    exportedObject.properties.push(
      builders.objectProperty(
        builders.identifier("myAppendedFunction"),
        functionToObject(async (ctx) => {
          console.log("hi")
          return 1
        })
      )
    )

    const modifiedCode = recast.prettyPrint(ast).code

    await fs.writeFile(filePath, modifiedCode, "utf8")
    console.log("✅ done")
  } catch (error) {
    console.error(error.message)
  }
}

const addMethod = (methodName) => {
  // Add a new method
  return builders.methodDefinition(
    "method",
    builders.identifier(methodName),
    builders.functionExpression(
      null,
      [builders.identifier("ctx")],
      builders.blockStatement([]),
      false,
      false
    )
  )
}

const addFunctionProperty = (name, newFunctionBody) => {
  return builders.objectProperty(
    builders.identifier(name),
    builders.functionExpression(
      null,
      [builders.identifier("ctx")],
      builders.blockStatement(newFunctionBody),
      false,
      false
    )
  )
}

const addStringProperty = (name) => {
  builders.objectProperty(
    builders.identifier("newProperty"),
    builders.stringLiteral("propertyValue")
  )
}

function functionToObject(func) {
  const funcCode = func.toString()
  const ast = recast.parse(funcCode, {
    parser: require("recast/parsers/babel"),
  })

  return ast.program.body[0].expression
}

module.exports = {
  addMethodToModule,
  addObjectToArray,
  objectToObjectExpression,
}

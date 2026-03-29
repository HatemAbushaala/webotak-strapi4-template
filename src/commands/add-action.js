const path = require("path")
const {
  addMethodToModule,
  addObjectToArray,
  objectToObjectExpression,
} = require("./helpers/recast")
const { writeFile } = require("fs").promises
module.exports = async () => {
  let [controllerName, actionName, routeName = actionName, method = "GET"] =
    process.argv.slice(3)

  method = method.toUpperCase()

  // ignore default strapi routes which their name = controller name
  let custom_route_file_name = Object.keys(
    strapi.api[controllerName].routes
  ).filter((key) => key !== controllerName)[0]

  if (custom_route_file_name == null) {
    custom_route_file_name = `${controllerName}-routes`
    await writeFile(
      path.join(
        __dirname,
        getRouteFilePath(controllerName, custom_route_file_name)
      ),
      "module.exports={routes:[]}"
    )
  }

  const route_file_path = getRouteFilePath(
    controllerName,
    custom_route_file_name
  )
  const controller_file_path = `../api/${controllerName}/controllers/${controllerName}.js`

  const collectionUUID = `api::${controllerName}.${controllerName}`
  const getRequest = async (ctx) => {
    const { id } = ctx.request.params
    const { ...query } = ctx.request.query
    const user = ctx.state.user
    const res = await strapi.db.query(collectionUUID).findMany({
      select: ["*"],
      where: {
        // id,
      },
    })
    return res
  }
  const postRequest = async (ctx) => {
    const body = ctx.request.body
    const user = ctx.state.user
    const result = await strapi.db.query(collectionUUID).create({
      data: body,
    })
    return result
  }
  const putRequest = async (ctx) => {
    const { id } = ctx.request.params
    const body = ctx.request.body
    const user = ctx.state.user
    const result = await strapi.db.query(collectionUUID).update({
      data: body,
      where: {
        id,
      },
    })
    return result
  }
  const deleteRequest = async (ctx) => {
    const { id } = ctx.request.params
    const user = ctx.state.user
    const result = await strapi.db.query(collectionUUID).delete({
      where: {
        id,
      },
    })
    return result
  }

  const request = {
    GET: getRequest,
    POST: postRequest,
    PUT: putRequest,
    DELETE: deleteRequest,
  }

  await addMethodToModule(
    path.join(__dirname, controller_file_path),
    actionName,
    request[method].toString().replace("collectionUUID", `"${collectionUUID}"`)
  )

  await addObjectToArray(
    path.join(__dirname, route_file_path),
    {
      method: method,
      path: `/${routeName}`,
      handler: `${controllerName}.${actionName}`,
      config: { auth: false },
    },
    (exportedObject) =>
      exportedObject?.properties?.find((p) => p?.key?.name === "routes").value
        ?.elements
  )

  console.log("✅ done")
  // append actionName
}

const getRouteFilePath = (controllerName, custom_route_file_name) => {
  return `../api/${controllerName}/routes/${custom_route_file_name}.js`
}

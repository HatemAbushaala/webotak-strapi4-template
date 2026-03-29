const { updateQuery } = require("../../helpers/queryUtils")
const updateUser = require('./lib/update-user')
// const me = require("./lib/me");
// const register = require("./lib/register");

const custom_routes = [
	{
		method: 'PUT',
		path: '/update-profile',
		handler: 'user.updateProfile',
		config: {
			roles: ['authenticated'],
			prefix: '', // in order to use /api only without plugin name
		},
		handlerFn: updateUser,
	},
]

const getRouteByHandler = (plugin, handler) => {
  return plugin.routes["content-api"].routes.find(
    (route) => route.handler === handler
  )
}

const updateDefaultRouteConfig = (plugin, handler, config) => {
  try {
    let route = getRouteByHandler(plugin, handler)
    if (route?.config) {
      route.config = { ...route.config, ...config }
    }
  } catch (err) {
    // console.log(err);
  }
}

module.exports = (plugin) => {
  // override default functions
  // plugin.controllers.auth.register = register;
  // plugin.controllers.user.me = me;

  updateDefaultRouteConfig(plugin, "auth.forgotPassword", { auth: false })
  updateDefaultRouteConfig(plugin, "auth.resetPassword", { auth: false })

  custom_routes.forEach((route) => {
    const { handlerFn, ...routeConfig } = route
    const [controller, actionName] = routeConfig.handler.split(".")

    // add controller action
    Object.assign(plugin.controllers[controller], { [actionName]: handlerFn })
    // add route
    plugin.routes["content-api"].routes.push(routeConfig)
  })

  return plugin
}

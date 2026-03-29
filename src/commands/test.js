module.exports = async () => {
  console.log(strapi.plugin("my-custom-field").routes)
  // strapi.config.set(`plugin.${pluginId}.settings`, { data: 1 })

  // console.log(strapi.plugin(pluginId).config("settings"))
}

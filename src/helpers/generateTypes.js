const fs = require("fs")
const path = require("path")
const { cwd } = require("process")
const generateTypes = async () => {
  const contentTypes = Object.entries(strapi.contentTypes).filter(([type]) => !type.startsWith("admin"))
  const ContentTypeDefinition = `export type ContentType = '${contentTypes
    .map(([type]) => {
      return type
    })
    .join("'|'")}'`

  const imports_list = []
  const res = [...contentTypes, ...Object.entries(strapi.components)].reduce((prev, [modelName, modelConfig]) => {
    return {
      ...prev,
      [modelName]: {
        info: modelConfig && {
          singularName: `"${modelConfig.info.singularName}"`,
          pluralName: `"${modelConfig.info.pluralName}"`,
          displayName: `"${modelConfig.info.displayName}"`,
          description: `"${modelConfig.info.description}"`,
        },
        attributes: Object.keys(modelConfig.attributes).reduce(
          (prev, attributeName) => {
            const attributeConfig = modelConfig.attributes[attributeName]

            let type = getType(attributeConfig.type)
            if (attributeConfig.type === "component") {
              type = `'${attributeConfig.component}'`
              if (attributeConfig.repeatable) {
                type = `Array<ContentTypes['${attributeConfig.component}']['attributes']>`
              } else {
                type = `ContentTypes['${attributeConfig.component}']['attributes']`
              }
            }
            if (attributeConfig.type === "json") {
              type = "object"
              const _path = `./types/json/${modelName}.${attributeName}.ts`
              if (fs.existsSync(path.join(cwd(), _path))) {
                type = `${modelName}_${attributeName}`
                imports_list.push([`./json/${modelName}.${attributeName}`, type])
              } else {
              }
            }
            if (attributeConfig.type === "media") {
              type = attributeConfig.multiple
                ? `Array<ContentTypes["plugin::upload.file"]['attributes']>`
                : `ContentTypes["plugin::upload.file"]['attributes']`
            }
            if (attributeConfig.type === "enumeration") {
              type = attributeConfig.enum.map((e) => `'${e}'`).join("|")
            }

            if (attributeConfig.type == "relation") {
              if (attributeConfig.relation == "oneToOne" || "manyToOne" == attributeConfig.relation) {
                // single
                type = `ContentTypes['${attributeConfig.target}']['attributes'] `
              } else if (attributeConfig.relation == "oneToMany" || "manyToMany" == attributeConfig.relation) {
                // array
                type = `Array<ContentTypes['${attributeConfig.target}']['attributes'] >`
              }
            }

            return { ...prev, [attributeName]: type }
          },
          { id: "number" }
        ),
      },
    }
  }, {})

  const fileContent = `
  ${imports_list.map(([path, name]) => `import ${name} from "${path}";`).join("\n")}
  ${ContentTypeDefinition}

  export type ContentTypes = ${stringifyObject(res)}
  
  export type ContentTypeAttributes<T extends ContentType> = T extends keyof ContentTypes ? ContentTypes[T]['attributes'] : never;

  export type ContentTypeApi = {
    [K in keyof ContentTypes as ContentTypes[K]["info"]["pluralName"]]: K
  }
  
  export type ContentTypeApiNames = keyof ContentTypeApi
  export type ContentTypeApiAttributes<T> = ContentTypeAttributes<ContentTypeApi[T]>

  `
  return fileContent
}

/* 
    this function has some issues with dealing with more complex object, use it with caution
*/
function stringifyObject(obj) {
  const result = []

  for (const key in obj) {
    const value = obj[key]
    const formattedValue = typeof value === "object" ? stringifyObject(value) : value

    // const k = key.includes("-") ? `"${key}"` : key;
    const k = `"${key}"`
    result.push(`${k}: ${formattedValue}`)
  }

  return `{ ${result.join(", ")} }`
}

// we need a way when we pass 'votes' as content type then returned type =
// strapi.models['votes'].allAttributes

/* 
    we need to build list of attributes for each content type 
    and then we can get them with content type name

*/

const getType = (type) => {
  const map = {
    boolean: "boolean",
    string: "string",
    richtext: "string",
    date: "string",
    timestamp: "string",
    datetime: "string",
    email: "string",
    password: "string",
    text: "string",
    number: "number",
    float: "number",
    decimal: "number",
    integer: "number",
  }

  return map[type] ?? "any"
}
module.exports = generateTypes

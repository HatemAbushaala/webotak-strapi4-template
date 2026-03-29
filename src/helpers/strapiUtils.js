const { Common, Attribute, Utils } = require("@strapi/strapi");
const { errors, sanitize } = require("@strapi/utils");
const { ApplicationError, ValidationError, NotFoundError } = errors;

/**
 * validate data based on model definition or throw validation error
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {object} data
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */
const validateCreateData = (collectionUUID, data) => {
  const model = strapi.getModel(collectionUUID);
  return strapi.entityValidator.validateEntityCreation(model, data);
};
/**
 * validate data based on model definition or throw validation error
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {object} data
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */
const validateUpdateData = (collectionUUID, data, entity) => {
  const model = strapi.getModel(collectionUUID);
  return strapi.entityValidator.validateEntityUpdate(model, data, {}, entity);
};

/**
 * validate data based on model definition or throw validation error
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {object} data
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */
const sanitizeOutput = (collectionUUID, data) => {
  const model = strapi.getModel(collectionUUID);
  return sanitize.contentAPI.output(data, model);
};

module.exports = {
  validateCreateData,
  validateUpdateData,
  sanitizeOutput,
};

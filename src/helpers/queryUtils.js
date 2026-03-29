const { Common, Attribute, Utils } = require("@strapi/strapi");

const { errors } = require("@strapi/utils");
const {
  validateUpdateData,
  sanitizeOutput,
  validateCreateData,
} = require("./strapiUtils");
const { getNumber } = require("./numberUtils");
const { ApplicationError, ValidationError, NotFoundError } = errors;

/**
 * add type safety to findMany
 * usage: let order = await findMany("api::order.order");
 * @template {Common.UID.ContentType } T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").FindParams<T>} [config]
 * @returns {Promise<Array<Attribute.GetValues<T, Utils.Array.Values<F>>>>}
 */

const findMany = (collectionUUID, config = {}) => {
  // @ts-ignore
  return strapi.db.query(collectionUUID).findMany(config);
};

/**
 * add type safety to findMany
 * usage: let order = await findMany("api::order.order");
 * @template {Common.UID.ContentType } T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").FindParams<T>} [config]
 * @returns {Promise<Array<Attribute.GetValues<T, Utils.Array.Values<F>>>>}
 */
const findManyPaginated = async (
  collectionUUID,
  config = {},
  page,
  page_size
) => {
  let _page = getNumber(page, 1);
  let _page_size = getNumber(page_size, 100);

  const [data, items_count] = await strapi.db
    .query(collectionUUID)
    .findWithCount({
      ...config,
      limit: _page_size,
      offset: (_page - 1) * _page_size,
    });

  return {
    data,
    meta: {
      total_items: items_count,
      total_pages: Math.ceil(items_count / _page_size),
      current_page: _page,
      page_size: _page_size,
    },
  };
};

/**
 * add type safety to createQuery
 * usage: let order = await createQuery("api::order.order",{where:{},data:{}});
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").CreateParams<T>} config
 * @param {{sanitize?:boolean,validate?:boolean}} [options]
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */

const createQuery = async (collectionUUID, config = { data: {} }, options) => {
  const { validate = false, sanitize = false } = options ?? {};

  let validData = config.data;
  if (validate)
    validData = await validateCreateData(collectionUUID, config.data);

  // remove id so we don't get database error
  // @ts-ignore
  delete config.data.id;

  /** Create components if exist */
  // query engine doesn't handle creation of component so we need to create them manually
  // this code is copied from entity service
  /*   const model = strapi.getModel(collectionUUID);
  const componentData = await createComponents(collectionUUID, validData);
  const entityData = applyTransforms(
    Object.assign(omitComponentData(model, validData), componentData),
    {
      contentType: model,
    }
  ); */
  /** ------------------------------------------------*/

  const queryResult = await strapi.db
    .query(collectionUUID)
    // @ts-ignore
    .create({ ...config, data: validData });

  if (sanitize) return sanitizeOutput(collectionUUID, queryResult);

  return queryResult;
};
/**
 * add type safety to updateQuery
 * usage: let order = await updateQuery("api::order.order",{where:{},data:{}});
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").UpdateParams<T>} config
 * @param {{sanitize?:boolean,validate?:boolean}} [options]
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */
const updateQuery = async (
  collectionUUID,
  config = { data: {}, where: {} },
  options
) => {
  const { validate = false, sanitize = false } = options ?? {};

  let validData = config.data;
  if (validate)
    validData = await validateUpdateData(
      collectionUUID,
      config.data,
      config.where
    );
  // remove id so we don't get database error
  delete validData.id;

  /** Update components if exist */
  // query engine doesn't handle update of component so we need to create them manually
  // this code is copied from entity service
  /*   const model = strapi.getModel(collectionUUID);
  const componentData = await updateComponents(
    collectionUUID,
    config.where,
    validData
  );
  const entityData = applyTransforms(
    Object.assign(omitComponentData(model, validData), componentData),
    {
      contentType: model,
    }
  ); */
  /** ------------------------------------------------*/

  const queryResult = await strapi.db
    .query(collectionUUID)
    .update({ ...config, data: validData });

  if (sanitize) return sanitizeOutput(collectionUUID, queryResult);

  return queryResult;
};

/**
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").DeleteParams<T>} config
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */
const deleteQuery = async (collectionUUID, config = {}) => {
  const delete_result = await strapi.db.query(collectionUUID).delete(config);
  if (!delete_result) return null;
  await deleteComponents(collectionUUID, delete_result, {
    loadComponents: false,
  });

  return delete_result;
};
/**
 * add type safety to findOne
 * usage: let order = await findOne("api::order.order");
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {import("../../types/queryParams").FindParams<T>} config
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
 */

const findOne = (collectionUUID, config = {}) => {
  // @ts-ignore
  return strapi.db.query(collectionUUID).findOne(config);
};
/**

  it's common that we need to find record by id and then make sure that we get result to complete our logic
  this function wrap default query findOne in order to throw Not found error if no results found

  usage: let order = await findOneOrThrow("api::order.order", ctx.request.params.id);
 * @template {Common.UID.ContentType} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {T} collectionUUID
 * @param {number|import("../../types/queryParams").FindParams<T>} filter id or where filters
 * @param {{not_found_message?:string,where?:object}} [options]
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>>}
*/
const findOneOrThrow = async (collectionUUID, filter, options) => {
  let { not_found_message } = options ?? {};

  if (!filter) {
    throw new ValidationError(`no id provided`);
  }

  let where;
  if (typeof filter === "object") where = filter;
  else where = { id: filter };

  if (!collectionUUID) {
    throw new Error(`no collection id provided`);
  }

  return findOrThrow(
    strapi.db.query(collectionUUID).findOne({
      where: where,
      ...options,
    }),
    not_found_message ??
      `no record found on ${collectionUUID} match your filters`
  );
};

/**

  this function accept promise and throw error if no results returned from that promise
  "in case we want to pass custom query or use entity service instead"

  usage:
   return findOrThrow(
        strapi.db.query(collectionUUID).findOne({
          where: { id: id },
          ...config,
        })
  )
  @param {Promise<any>} promise
*/
const findOrThrow = async (promise, not_found_message = `record not found`) => {
  let results = await promise;
  if (!results) {
    throw new NotFoundError(not_found_message);
  }

  return results;
};

// TODO ADD TYPES
const findOrCreate = async (
  collectionUUID,
  filters = {},
  data = {},
  config = {}
) => {
  const entry = await strapi.db.query(collectionUUID).findOne({
    ...config,
    where: filters,
  });
  if (entry) return entry;

  return await strapi.db.query(collectionUUID).create({
    ...config,
    data,
  });
};

// TODO ADD TYPES
const createOrUpdate = async (
  collectionUUID,
  updateConfig = { where: {}, data: {} },
  createData = {},
  config = {}
) => {
  const entry = await strapi.db.query(collectionUUID).update({
    ...config,
    ...updateConfig,
  });
  if (entry) return entry;

  return await strapi.db.query(collectionUUID).create({
    ...config,
    data: createData,
  });
};

module.exports = {
  findManyPaginated,
  findOrCreate,
  createOrUpdate,
  findMany,
  updateQuery,
  deleteQuery,
  createQuery,
  findOne,
  findOrThrow,
  findOneOrThrow,
};

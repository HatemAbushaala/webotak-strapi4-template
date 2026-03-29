const { default: axios } = require("axios");
const { randomUUID } = require("crypto");
/* 
  usage: $npm run cmd api-name route-file-name
  example with strapi default route : $npm run cmd order
  example with custom routes where filename is 'custom': $npm run cmd order custom
  NOTE: you must set POSTMAN_COLLECTION_ID, POSTMAN_API_KEY env variables
*/

// https://www.postman.com/postman/workspace/postman-public-workspace/documentation/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a
module.exports = async (strapi) => {
  const [apiName, routeFileName] = process.argv.slice(3);
  const routes = strapi.api[apiName].routes[routeFileName ?? apiName].routes;

  const requests = routes.map((r) => {
    // setup token if this request is not public
    const authConfig =
      r.config.auth === false
        ? {}
        : {
            auth: {
              type: "bearer",
              bearer: [
                {
                  key: "token",
                  value: "{{token}}",
                  type: "string",
                },
              ],
            },
            currentHelper: "bearerAuth",
            helperAttributes: '{"id":"bearer","token":"xxx"}',
          };

    return {
      id: randomUUID(),
      name: r.handler,
      method: r.method,
      url: `{{url}}${r.path}`,
      ...authConfig,
    };
  });

  const res = await addRequestToCollection(apiName, requests);
};

async function addRequestToCollection(folderName, requests) {
  const collectionId = process.env.POSTMAN_COLLECTION_ID;
  const apiKey = process.env.POSTMAN_API_KEY;

  if (!collectionId || !apiKey)
    throw new Error(
      "you must set POSTMAN_COLLECTION_ID, POSTMAN_API_KEY env variables"
    );

  try {
    // Create a Postman API request to add the new request to the collection
    const response = await axios.post(
      `https://api.getpostman.com/collections/${collectionId}/folders`,
      {
        name: folderName,
        requests,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
      }
    );

    if (response.status === 200) {
      console.log("New request added to the collection successfully.");
    } else {
      console.log(response);
      console.error("Failed to add the new request to the collection.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

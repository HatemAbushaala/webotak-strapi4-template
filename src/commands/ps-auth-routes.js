const { default: axios } = require("axios");
const { randomUUID } = require("crypto");
/* 
  usage: $npm run cmd api-name route-file-name
  example with strapi default route : $npm run cmd order
  example with custom routes where filename is 'custom': $npm run cmd order custom
  NOTE: you must set POSTMAN_COLLECTION_ID, POSTMAN_API_KEY env variables
*/
module.exports = async (strapi) => {
  const requests = [
    {
      id: randomUUID(),
      name: "login",
      method: "POST",
      url: `{{url}}/auth/local`,
      data: [
        {
          key: "identifier",
          value: "user@gmail.com",
        },
        {
          key: "password",
          value: "12345678",
        },
      ],
      dataMode: "urlencoded",

      // dataMode: "raw",
      // rawModeData: JSON.stringify({
      //   identifier: "email",
      //   password: "12345678",
      // }),
      // dataOptions: {
      //   raw: {
      //     language: "json",
      //   },
      // },
    },
    {
      id: randomUUID(),
      name: "register",
      method: "POST",
      url: `{{url}}/auth/local/register`,
      data: [
        {
          key: "email",
          value: "user@gmail.com",
        },
        {
          key: "username",
          value: "user@gmail.com",
        },
        {
          key: "name",
          value: "user",
        },
        {
          key: "password",
          value: "12345678",
        },
      ],
      dataMode: "urlencoded",
    },
    {
      id: randomUUID(),
      name: "reset password",
      method: "POST",
      url: `{{url}}/auth/reset-password`,
      data: [
        {
          key: "password",
          value: "87654321",
          description: "new password",
        },
        {
          key: "passwordConfirmation",
          value: "87654321",
          description: "confirm new password",
        },
        {
          key: "code",
          value: "code",
          description: "code you receive from email",
        },
      ],
      dataMode: "urlencoded",
    },
    {
      id: randomUUID(),
      name: "forgot-password",
      method: "POST",
      url: `{{url}}/auth/forgot-password`,
      data: [
        {
          key: "email",
          value: "user@gmail.com",
        },
      ],
      dataMode: "urlencoded",
    },
    {
      id: randomUUID(),
      name: "user profile",
      method: "GET",
      url: `{{url}}/users/me`,
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
    },
    {
      id: randomUUID(),
      name: "update user",
      method: "PUT",
      url: `{{url}}/users/:id`,
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
    },
    {
      id: randomUUID(),
      name: "change user password",
      method: "POST",
      url: `{{url}}/auth/change-password`,
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
      data: [
        {
          key: "currentPassword",
          value: "12345678",
        },
        {
          key: "password",
          value: "87654321",
          description: "new password",
        },
        {
          key: "passwordConfirmation",
          value: "87654321",
          description: "confirm new password",
        },
      ],
      dataMode: "urlencoded",
    },
  ];

  const res = await addRequestToCollection("auth", requests);
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

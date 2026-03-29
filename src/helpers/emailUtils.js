const sendFormattedEmail = async ({
  // required
  to, // receiver
  subject, // email subject
  title, // email body header
  body, // email body content
  // optional
  footer = `Thank you for choosing our service. If you have any questions or need further assistance, please don't hesitate to contact us.`,
  show_logo = true,
  show_footer = true,
}) => {
  // Define your email template
  let emailTemplate = `
    <h1><%= title %></h1>
    <p><%= body %></p>
      
  `;

  if (show_logo) {
    // use
    let logoUrl = "https://i.imgur.com/JWURJW3.png";

    //   optional logic to add logo based on app menuLogo
    /* if (process.env.NODE_ENV === "production") {
      let menuLogoUrl = (
        await strapi.service("admin::project-settings").getProjectSettings()
      )?.menuLogo?.url;

      // if local file => we need to add server url
      if (menuLogoUrl && menuLogoUrl.startsWith("/")) {
        const { url, host, port } = strapi.config.server;
        logoUrl = `https://${url || host}:${port}${logoUrl}`;
      }
    } */

    emailTemplate = `<img width="auto" height="40px" src="${logoUrl}"/>${emailTemplate}`;
  }

  if (show_footer) {
    emailTemplate += `<p>${footer}</p>`;
  }

  try {
    const res = await strapi
      .plugin("email")
      .service("email")
      .sendTemplatedEmail(
        {
          to,
        },
        {
          subject,
          text: body,
          html: emailTemplate,
        },
        { title, body }
      );

    return res;
  } catch (err) {
    console.log("🚀 ~ file: emailUtils.js:61 ~ fail sending email:", err);
  }
};

const sendTemplateEmail = async ({
  to, // receiver
  subject, // email subject
  title, // email body header
  body, // email body content
  template = 1,
}) => {
  try {
    await strapi.plugins["email-designer"].services.email.sendTemplatedEmail(
      {
        to,
      },
      {
        templateReferenceId: template ?? 1, // required - you can get the template id from the admin panel
        subject, // If provided here will override the template's subject. Can include variables like `Thank you for your order {{= user.firstName }}!`
      },
      {
        title,
        body,
      }
    );
  } catch (err) {
    strapi.log.error("📺: ", err);
  }
};

module.exports = {
  sendFormattedEmail,
  sendTemplateEmail,
};

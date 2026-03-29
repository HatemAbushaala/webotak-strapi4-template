const { isNullOrEmpty } = require("./objectUtils");

/* 
    withCountryCode = false 
    'make sure starts with zero'
        091xxx => return as is 
        91xxx => return 091xxx
    withCountryCode = true
    'add country code and remove leading zero'
        091xxx => return +21891xxx
        91xxx => return +21891xxx
*/
const getFormattedPhoneNumber = (phone, withCountryCode = false) => {
  if (!phone) return "";
  // remove leading zero
  if (withCountryCode) {
    return `+218${phone.replace(/^0+/, "")}`;
  } else if (phone[0] === "0") return phone;
  else return `0${phone}`;
};

const getStringWithSeperator = (str, seperator) => {
  if (isNullOrEmpty(str)) return "";
  if (isNullOrEmpty(seperator)) return str;
  else return `${seperator} ${str}`;
};

const randomString = (length = 4) => {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  let string = "";
  for (let ii = 0; ii < length; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }

  return string;
};

const randomEmail = () => {
  return randomString(7) + "@faqraou.com";
};

const isArabicText = (text) => {
  const regex = /[\u0600-\u06FF\u0750-\u077F]/;
  return regex.test(text);
};
const containSpeicalCharacters = (text) => {
  const regex =
    /[!؟ـ،./؛١٢٣٤٥٦٧٨٩٠1234567890@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return regex.test(text);
};

module.exports = {
  getStringWithSeperator,
  getFormattedPhoneNumber,
  randomString,
  randomEmail,
};

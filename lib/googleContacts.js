const fs = require("fs");
const { google } = require("googleapis");

const token = JSON.parse(fs.readFileSync("token.json"));
const credentials = JSON.parse(fs.readFileSync("client_secret.json"));

const { client_id, client_secret, redirect_uris } =
  credentials.installed;

const auth = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

auth.setCredentials(token);

const people = google.people({
  version: "v1",
  auth
});

async function saveContact(number, name) {
  try {
    const contactName = `Sts ${name || number}`;

    await people.people.createContact({
      requestBody: {
        names: [
          {
            givenName: contactName
          }
        ],
        phoneNumbers: [
          {
            value: number
          }
        ]
      }
    });

    console.log("✅ Contact Saved:", contactName);
  } catch (err) {
    console.log("❌ Contact Save Error:", err.message);
  }
}

module.exports = { saveContact };

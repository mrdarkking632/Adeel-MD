const fs = require("fs");
const { google } = require("googleapis");

const token = JSON.parse(fs.readFileSync("token.json"));
const credentials = JSON.parse(fs.readFileSync("client_secret.json"));

const { client_id, client_secret, redirect_uris } = credentials.installed;

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

function normalizeNumber(number) {
  return number.replace(/\D/g, "").replace(/^92/, "");
}

async function saveContact(number, name) {
  try {
    const connections = await people.people.connections.list({
      resourceName: "people/me",
      personFields: "names,phoneNumbers",
      pageSize: 1000
    });

    const exists = (connections.data.connections || []).some(person =>
      (person.phoneNumbers || []).some(phone =>
        normalizeNumber(phone.value) === normalizeNumber(number)
      )
    );

    if (exists) {
      console.log("⏭ Already Saved:", number);
      return;
    }

    const res = await people.people.createContact({
      requestBody: {
        names: [
          {
            givenName: `Sts ${name || number}`
          }
        ],
        phoneNumbers: [
          {
            value: number
          }
        ]
      }
    });

    console.log("✅ Created:", res.data.resourceName);

  } catch (err) {
    console.log("❌ Contact Error:", err.response?.data || err.message);
  }
}

module.exports = { saveContact };

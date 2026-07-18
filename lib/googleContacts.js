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

async function saveContact(number, name) {
  try {
    // Pehle check karo number pehle se save hai ya nahi
    const search = await people.people.searchContacts({
      query: number,
      readMask: "names,phoneNumbers"
    });

    if (search.data.results && search.data.results.length > 0) {
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

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const CREDENTIALS = JSON.parse(fs.readFileSync("client_secret.json"));

const { client_secret, client_id, redirect_uris } = CREDENTIALS.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPES = [
  "https://www.googleapis.com/auth/contacts"
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES
});

console.log("\nOpen this URL in your browser:\n");
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\nPaste Code Here: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    fs.writeFileSync(
      "token.json",
      JSON.stringify(tokens, null, 2)
    );

    console.log("\n✅ token.json created successfully!");
  } catch (e) {
    console.log("❌ Error:", e.message);
  }

  rl.close();
});

const fs = require('fs');

// 1. Define the path where the missing file should be
const dir = './src/environments';
const targetPath = './src/environments/environment.ts';

// 2. Create the folder if it doesn't exist
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// 3. Define the content of the file
// We grab the API key from Vercel's settings
const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${process.env.apiKey || "YOUR_API_KEY"}',
  weatherBaseUrl:'https://api.openweathermap.org/data/2.5',
  firebaseConfig: {
    apiKey: "${process.env.FIREBASE_API_KEY || "YOUR_API_KEY"}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN"}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID"}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET"}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_ID"}",
    appId: "${process.env.FIREBASE_APP_ID || "YOUR_API_ID"}",
    measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"}"
  }
};
`;

// 4. Write the file to disk
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log('Error creating environment file:', err);
  } else {
    console.log(`Successfully generated ${targetPath}`);
  }
});

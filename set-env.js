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
    apiKey: "${process.env.firebaseConfig.apiKey || "YOUR_API_KEY"}",
    authDomain: "${process.env.firebaseConfig.authDomain || "YOUR_AUTH_DOMAIN"}",
    projectId: "${process.env.firebaseConfig.projectId || "YOUR_PROJECT_ID"}",
    storageBucket: "${process.env.firebaseConfig.storageBucket || "YOUR_STORAGE_BUCKET"}",
    messagingSenderId: "${process.env.firebaseConfig.messagingSenderId || "YOUR_MESSAGING_ID"}",
    appId: "${process.env.firebaseConfig.appId || "YOUR_API_ID"}",
    measurementId: "${process.env.firebaseConfig.measurementId || "YOUR_MEASUREMENT_ID"}"
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

const fs = require('fs');

// Path to the file we want to write
const targetPath = './src/environments/environment.ts';

// The content we want to write into the file
// IMPORTANT: Use the exact variable name you have in Vercel (e.g., WEATHER_API_KEY)
const envConfigFile = `
export const environment = {
  production: true,
  weatherApiKey: '${process.env.apiKey}'
};
`;

// Write the file
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Output generated at ${targetPath}`);
  }
});

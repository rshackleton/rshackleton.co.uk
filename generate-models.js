const { exec } = require('child_process');

require('dotenv').config({
  path: '.env.local',
});

const command = `kontent-generate --projectId=${process.env.KONTENT_PROJECT_ID} --addTimestamp=true --codeType=TypeScript --moduleResolution=ES2015 --strictPropertyInitalization=true`;

// Change working directory.
process.chdir('./src/models');

// Execute module generation.
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
});

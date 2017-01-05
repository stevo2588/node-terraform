const Promise = require('bluebird');
const program = require('commander');
const main = require("./main/main");

program
  .option('-e --env <env>', 'Environment', /^(local|staging|production)$/i, 'NONE')
  .parse(process.argv);

if (program.env == 'NONE') {
   console.error('Must specify valid environment!');
   process.exit(1);
}

process.chdir('./terraform');
main.runTerraformDestroy();
process.chdir('../');

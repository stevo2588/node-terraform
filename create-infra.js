const Promise = require('bluebird');
const program = require('commander');
const main = require("./main/main");


// TODO: detect host interface for vb network adapter in local env

program
  .option('-e --env <env>', 'Environment', /^(local|staging|production)$/i, 'NONE')
  .parse(process.argv);

if (program.env == 'NONE') {
   console.error('Must specify valid environment!');
   process.exit(1);
}

process.chdir('./terraform');

main.createTerraformFile(program.env).then(() => {
  main.runTerraform();
}).catch((err) => {
  console.error("Something went wrong: %s", err);
  main.removeTerraformFile();
}).then(() => {
    process.chdir('../');
});

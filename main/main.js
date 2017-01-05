#!/usr/bin/env node
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Mustache = require('mustache');
const exec = require('child_process').execSync;


var tfFilename = "temp.tf";


function createTerraformFile(env) {
  console.log("Creating tf file for %s environment...", env);
  var module;
  switch(env) {
    case "local":
      module = "vb_instance";
      break;
    case "staging":
      module = "vb_instance";
      break;
    case "production":
      module = "aws_instance";
  }

  var view = {
    module: module
  };

  return fs.readFileAsync('terraform.tf_template').then((data) => {
    return Mustache.render(data.toString(), view);
  }).then((output) => {
    return fs.writeFileAsync(tfFilename, output);
  }).then(() => {
    console.log("finished creating tf file");
  }).catch((err) => {
    console.error('Problem converting file: %s', err.toString());
    throw err;
  });
}

function removeTerraformFile() {
  console.log("Removing tf file");
  fs.unlinkAsync(tfFilename).catch((err) => {
    if (err.code === "ENOENT")
      console.log("tf file does not exist");
    else throw err;
  }).catch((err) => {
    console.error("tf file could not be removed!");
  });
}

function runTerraform() {
  console.log("Running terraform...");

  const terraformGet = exec('terraform get', {stdio:[0,1,2]});
  const terraform = exec('terraform plan', {stdio:[0,1,2]});
}

function runTerraformDestroy() {
  console.log("Destroying infrastructure...");

  const terraform = exec('terraform destroy', {stdio:[0,1,2]});
}


module.exports = {
  createTerraformFile,
  removeTerraformFile,
  runTerraform,
  runTerraformDestroy
}

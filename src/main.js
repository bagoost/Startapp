import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { exec as CPExec } from 'child_process';
import { exit } from 'process';

const access = promisify(fs.access);
const copy = promisify(ncp);
const exec = promisify(CPExec);

async function copyTemplateFiles(options) {
  if (fs.existsSync(options.slug)) {
    console.error('Directory already exists');
    exit(1);
  }
  return copy(options.templateDirectory, options.slug, {
    clobber: false,
  });
}

async function installDependencies(options) {
  const { stdout } = await exec(`${(options.yarn) ? 'yarn' : 'npm'} install`);
  console.log(stdout);
}

async function updatePackageJson(options) {
  const fileContent = fs.readFileSync('./package.json');
  const jsonContent = JSON.parse(fileContent);
  jsonContent.name = options.slug.slice(2);
  fs.writeFileSync('./package.json', JSON.stringify(jsonContent, undefined, '  ') + '\n');
}

export async function createProject(options) {
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('ERROR: Invalid template name');
    process.exit(1);
  }

  console.log('Copying project files...');
  await copyTemplateFiles(options);
  console.log('Finished copying files');

  process.chdir(options.slug);
  
  console.log('Installing dependencies...');
  await installDependencies(options);
  console.log('Finished installing dependencies');

  updatePackageJson(options);

  if (options.git) {
    const { stdout } = await exec('git init');
    console.log(stdout);
  }

  return true;
}

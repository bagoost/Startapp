import arg from 'arg';
import inquirer from 'inquirer';
import createProject from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--type': String,
      '--manager': String,
      '--git': Boolean,
      '-t': '--type',
      '-m': '--manager',
      '-g': '--git',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  if (args['--manager'] !== undefined) {
    if (!(args['--manager'] === 'npm' || args['--manager'] === 'yarn')) {
      console.log('Manager should be one of "npm" or "yarn"');
      process.exit(1);
    }
  }
  if (args['--type'] !== undefined) {
    if (!(args['--type'] === 'web' || args['--type'] === 'server')) {
      console.log('Type should be one of "web" or "server"');
      process.exit(1);
    }
  }
  return {
    type: args['--type'] || '',
    name: 'My new project',
    slug: 'my-new-project',
    template: 'Default',
    manager: args['--manager'] || '',
    git: args['--git'] || false,
  };
}

async function promptForMissingOptions(options) {
  let projectType = options.type;
  if (options.type.length === 0) {
    projectType = await inquirer.prompt([{
      type: 'list',
      name: 'name',
      message: 'Project type',
      choices: ['Web', 'Server'],
      default: 'Web',
    }])
      .then((answer) => answer.name.toLowerCase());
  }
  const projectName = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: options.name,
  }])
    .then((answer) => answer.name);

  const questions = [];
  questions.push({
    type: 'input',
    name: 'slug',
    message: 'Project slug',
    default: projectName.replaceAll(' ', '-').toLowerCase(),
  });

  if (options.manager.length === 0 && projectType === 'web') {
    questions.push({
      type: 'list',
      name: 'manager',
      message: 'Select your project manager',
      choices: ['yarn', 'npm'],
      default: 'yarn',
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    type: projectType,
    name: projectName,
    slug: `./${answers.slug || options.slug}`,
    manager: answers.manager || options.manager,
    git: options.git || answers.git,
  };
}

export default async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

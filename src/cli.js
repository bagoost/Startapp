import arg from 'arg';
import inquirer from 'inquirer';
import createProject from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--yarn': Boolean,
      '-g': '--git',
      '-y': '--yes',
    },
    {
      argv: rawArgs.slice(2),
    },
  );
  return {
    name: 'My new project',
    slug: 'my-new-project',
    template: 'Default',
    yarn: args['--yarn'] || false,
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
  };
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return options;
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

  if (!options.yarn) {
    questions.push({
      type: 'confirm',
      name: 'yarn',
      message: 'Use yarn as package manager?',
      default: true,
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
    name: projectName,
    slug: `./${answers.slug || options.slug}`,
    yarn: answers.yarn || options.yarn,
    git: options.git || answers.git,
  };
}

export default async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

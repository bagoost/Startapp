# Scripts

## Before you begin

1. Ask for the `aws-credentials.zip` to your tech manager, download it and place it in your root directory folder, and unzip it.
2. Install the Elastic Beanstalk's CLI: it can be done with `brew install aws-elasticbeanstalk`. Other options described [here](https://github.com/aws/aws-elastic-beanstalk-cli-setup).
3. Add the backend_template.pem ssh key to your local storage (usually, a folder named `~/.ssh`, if it does not recognize this path, you can search it with `find $HOME -type d -name ".ssh" 2>&1 | grep -v find`). Ask for this key to your tech manager.
4. Ensure your key is not publicly viewable, you can do it with he command `chmod 400 backend_template.pem` from your ssh folder.
5. Give permissions to execute the scripts folder `chmod u+x scripts/*`.

## To make things easier
You can run a single command and it will ask you different questions to run the exact script that you want. Just run `make script` and answer the questions :)

## To see a specific container logs

### Positional arguments

| Position |  Parameter  | Required |                        Options                        |
|:--------:|:-----------:|:--------:|:-----------------------------------------------------:|
|     1    | Environment |   True   |     One of: `development`, `staging`, `production`    |
|     2    |  Container  |   True   | One of: `django`, `nginx`, `celerybeat`, `celeryworker` |
|     3    |    Follow   |   False  |                       `--follow`                      |

### Examples
`scripts/container-logs development celeryworker`\
`scripts/container-logs staging nginx --follow`

## To see Docker stats

### Positional arguments

| Position |  Parameter  | Required |                        Options                        |
|:--------:|:-----------:|:--------:|:-----------------------------------------------------:|
|     1    | Environment |   True   |     One of: `development`, `staging`, `production`    |

### Examples
`scripts/docker-stats development`\
`scripts/docker-stats staging`

## To see the instance's memory usage

### Positional arguments

| Position |  Parameter  | Required |                        Options                        |
|:--------:|:-----------:|:--------:|:-----------------------------------------------------:|
|     1    | Environment |   True   |     One of: `development`, `staging`, `production`    |
|     2    |    Follow   |   False  |                       `--follow`                      |

### Examples
`scripts/instance-memory development`\
`scripts/instance-memory staging --follow`

### Disclaimer
If you want to see aditional info (such as what processes are using more memory), you can manualy ssh into the instance (`eb ssh <environment>-env`) and run `top -aM`. This could not be configured as a script.

## To seed a specific environment

### Positional arguments

| Position |  Parameter  | Required |                        Options                        |
|:--------:|:-----------:|:--------:|:-----------------------------------------------------:|
|     1    | Environment |   True   |     One of: `development`, `staging`, `production`    |

### Examples
`scripts/seed development`\
`scripts/seed development; scripts/seed staging` (to seed more than one environment)

## To create a superuser

### Positional arguments

| Position |  Parameter  | Required |                        Options                        |
|:--------:|:-----------:|:--------:|:-----------------------------------------------------:|
|     1    | Environment |   True   |     One of: `development`, `staging`, `production`    |

### Examples
`scripts/createsuperuser development`

# This script, expects the environment as an input (development, staging, production)
# Example: scripts/seed development

# If you want to run more than one environment at a time, you can run:
# scripts/seed development; scripts/seed staging

# Exit if non-zero status
set -e

# Get Django container id
DJANGO=$(eb ssh $1 --command "sudo docker ps -qf "name=django"" --quiet)

# Execute the command in the desired environment
if [ "$1" != "production" ] && [ "$1" != "staging" ]
then
    eb ssh $1 --command "sudo docker exec -i $DJANGO python manage.py loaddata fixtures/populate" --quiet
fi
eb ssh $1 --command "sudo docker exec -i $DJANGO python manage.py loaddata fixtures/production" --quiet

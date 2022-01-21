# This script, expects the environment as an input (development, staging, production)
# Example: scripts/rebuild-indices.sh development

# Exit if non-zero status
set -e

# Get the container id
CONTAINER=$(eb ssh $1 --command "sudo docker ps -qf "name=django"" --quiet)

# Execute the command in the desired environment for the desired container
eb ssh $1 --command "sudo docker exec $CONTAINER python manage.py search_index --rebuild -f" --quiet

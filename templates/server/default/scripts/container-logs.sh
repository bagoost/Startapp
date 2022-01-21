# This script, expects the environment as an input (development, staging, production)
# Followed by the name of the container (django, nginx, celerybeat, celeryworker)
# As an OPTIONAL input, you can pass the --follow flag as the third input
# Example: scripts/container-logs development celeryworker
# Example with follow: scripts/container-logs development celeryworker --follow

# Exit if non-zero status
set -e

# Get the container id
CONTAINER=$(eb ssh $1 --command "sudo docker ps -qf "name=$2"" --quiet)

# Execute the command in the desired environment for the desired container
eb ssh $1 --command "sudo docker logs $CONTAINER $3" --quiet

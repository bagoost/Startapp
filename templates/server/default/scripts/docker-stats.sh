# This script, expects the environment as an input (development, staging, production)
# Example: scripts/docker-stats development

# Exit if non-zero status
set -e

# Execute the command in the desired environment
eb ssh $1 --command "sudo docker stats" --quiet

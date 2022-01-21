# This script, expects the environment as an input (development, staging, production)
# As an OPTIONAL input, you can pass the --follow flag as the third input
# Example: scripts/instance-memory development
# Example with follow: scripts/instance-memory staging --follow

# Exit if non-zero status
set -e

# Execute the command in the desired environment
if [ "$2" = "--follow" ]
then eb ssh $1 --command "free -m -s 10" --quiet
else
eb ssh $1 --command "free -m" --quiet
fi

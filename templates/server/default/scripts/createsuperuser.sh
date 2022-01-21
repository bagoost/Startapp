# This script, expects the environment as an input (development, staging, production)
# Example: scripts/createsuperuser development

# Exit if non-zero status
set -e

# Get Django container id
DJANGO=$(eb ssh $1 --command "sudo docker ps -qf "name=django"" --quiet)

# Print the instructions in the desired environment
echo "Run the following command:"
echo "$ eb ssh $1"
echo ""
echo "And inside the instance run:"
echo "$ sudo docker exec -it $DJANGO python manage.py createsuperuser"

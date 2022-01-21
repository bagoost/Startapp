echo Select the desired operation
select script in container-logs docker-stats instance-memory seed createsuperuser rebuild-indices
do
  echo Selected script: $script
  case $script in
    container-logs)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      echo Select a container
      select container in django nginx celerybeat celeryworker
      do
        echo Selected container: $container
        break
      done
      echo Follow?
      select follow in Yes No
      do
        echo Follow: $follow
        break
      done
      clear
      if [ "$follow" = "Yes" ]
      then echo Running: scripts/$script.sh $env $container --follow; scripts/$script.sh $env $container --follow
      else echo Running: scripts/$script.sh $env $container; scripts/$script.sh $env $container
      fi
      break;;
    docker-stats)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      clear
      echo Running: scripts/$script.sh $env
      scripts/$script.sh $env
      break
      ;;
    instance-memory)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      echo Follow?
      select follow in Yes No
      do
        echo Follow: $follow
        break
      done
      clear
      if [ "$follow" = "Yes" ]
      then echo Running: scripts/$script.sh $env --follow; scripts/$script.sh $env --follow
      else echo Running: scripts/$script.sh $env; scripts/$script.sh $env
      fi
      break
      ;;
    seed)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      clear
      echo Running: scripts/$script.sh $env
      scripts/$script.sh $env
      break
      ;;
    createsuperuser)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      clear
      echo Running: scripts/$script.sh $env
      scripts/$script.sh $env
      break
      ;;
    rebuild-indices)
      echo Select an environment
      select env in development staging production
      do
        echo Selected environment: $env
        break
      done
      clear
      echo Running: scripts/$script.sh $env
      scripts/$script.sh $env
      break
      ;;
    *)
      echo Invalid option\nSelect again
      ;;
  esac
done

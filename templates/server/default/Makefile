## ------------ SCRIPTS ------------
script:
	scripts/index.sh

## ------------- LOCAL -------------
up:
	docker-compose -p backend_template -f local.yml up -d
build:
	docker-compose -p backend_template -f local.yml up -d --build
down:
	docker-compose -p backend_template -f local.yml down -v
start:
	docker-compose -p backend_template -f local.yml start
stop:
	docker-compose -p backend_template -f local.yml stop
restart:
	docker-compose -p backend_template -f local.yml restart $(service)
recreate:
	docker-compose -p backend_template -f local.yml up -d --force-recreate django
rebuild:
	docker-compose -p backend_template -f local.yml down -v && docker-compose -p backend_template -f local.yml up -d --build
test:
	docker-compose -p backend_template -f local.yml exec django pytest -v $(target)
migrate:
	docker-compose -p backend_template -f local.yml exec django python manage.py migrate
makemigrations:
	docker-compose -p backend_template -f local.yml exec django python manage.py makemigrations
createsuperuser:
	docker-compose -p backend_template -f local.yml exec django python manage.py createsuperuser
loaddata:
	docker-compose -p backend_template -f local.yml exec django python manage.py loaddata $(file)
urls:
	docker-compose -p backend_template -f local.yml exec django python manage.py show_urls
shell:
	docker-compose -p backend_template -f local.yml exec django python manage.py shell -i bpython
shell-dj:
	docker-compose -p backend_template -f local.yml exec django bash
log-dj:
	docker-compose -p backend_template -f local.yml logs -f --tail 50 django
log-cw:
	docker-compose -p backend_template -f local.yml logs -f --tail 50 celeryworker
pre-commit:
	docker-compose -p backend_template -f local.yml exec django pre-commit run -a
rebuild-search:
	docker-compose -p backend_template -f local.yml exec django python manage.py search_index --rebuild
startapp:
	docker-compose -p backend_template -f local.yml exec django python manage.py startapp $(app)

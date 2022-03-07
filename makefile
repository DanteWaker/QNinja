# Lint commands
lint:
	python -m flake8 --ignore=E203,E501,W503 ./api
	python -m black ./api --check

black:
	python -m black ./api

# Test commands
test:
	docker-compose run --rm api test

# Build and run the projext
build_run:
	docker-compose build && docker-compose run --rm api setup && docker-compose run --rm next setup && docker-compose up

# Api commands
api_bash:
	docker exec -it qninja_api_1 bash

migrate:
	docker exec qninja_api_1 python manage.py migrate

makemigrations:
	docker exec qninja_api_1 python manage.py makemigrations

# Command to install a new pip dependency on api container and put it in requirements.txt
#     Ex: make pip_install pkg=django-cleanup
pip_install:
	docker exec qninja_api_1 python -m pip install $(pkg) && docker exec qninja_api_1 pip freeze | grep $(pkg) >> ./requirements.txt

# Next commands
next_bash:
	docker exec -it qninja_next_1 bash

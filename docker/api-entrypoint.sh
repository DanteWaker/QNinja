#!/bin/sh -e

work_dir="/home/python/qninja"
h_spacer="========="
e_spacer=":::::::::"
a_spacer="---------"
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
white='\033[0;37m'
reset='\033[0m'

db_setup() {
    cd ${work_dir}/api

    echo "\n${white}${h_spacer} Resolving database migrations ${h_spacer}${reset}\n"
    python manage.py makemigrations
    if [ $? -ne 0 ]; then
        echo "\n${red}${e_spacer} Error while resolving migrations ${e_spacer}${reset}\n"
        exit 1
    fi

    echo "\n${white}${h_spacer} Applying migrations to the database ${h_spacer}${reset}\n"
    python manage.py migrate
    if [ $? -ne 0 ]; then
        echo "\n${red}${e_spacer} Error while applying migrations to the database ${e_spacer}${reset}\n"
        exit 1
    fi

    echo "\n${green}${h_spacer} Migrations applied ${h_spacer}${reset}\n"
}

django_setup() {
    cd ${work_dir}/api

    echo "\n${white}${h_spacer} Setting up default groups and permissions ${h_spacer}${reset}\n"
    python manage.py set_group_perms

    echo "\n${white}${h_spacer} Seeding the database with default data ${h_spacer}${reset}\n"
    python manage.py seed_db

    echo "\n${white}${h_spacer} Creating superuser ${h_spacer}${reset}\n"
    python manage.py createsuperuser
    if [ $? -ne 0 ]; then
        echo "\n${red}${e_spacer} Error while creating superuser ${e_spacer}${reset}\n"
        exit 1
    fi

    echo "\n${green}${h_spacer} Django setup finalized ${h_spacer}${reset}\n"
}

case $1 in

setup)
    db_setup
    django_setup
    ;;

django_setup)
    django_setup
    ;;

db_setup)
    db_setup
    ;;

test)
    exec python manage.py test
    ;;

development)
    exec python manage.py runserver 0.0.0.0:8000
    ;;

django_q)
    exec python manage.py qcluster
    ;;

production)
    db_setup
    python manage.py collectstatic --no-input
    exec gunicorn --workers=3 api.wsgi -b 0.0.0.0:8000
    ;;

*)
    exec "$@"
    ;;

esac

exit 0

#!/bin/sh -e

spacer="========="

echo "\n${spacer} Resolving database migrations ${spacer}\n"
python api/manage.py makemigrations

echo "\n${spacer} Applying migrations to the database ${spacer}\n"
python api/manage.py migrate --no-input

echo "\n${spacer} Setting up default groups and permissions ${spacer}\n"
python api/manage.py set_group_perms

echo "\n${spacer} Seeding the database with default data ${spacer}\n"
python api/manage.py seed_db

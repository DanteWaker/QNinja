release: bash api/release.sh
web: gunicorn --pythonpath api api.wsgi --log-file -
worker: python api/manage.py qcluster --settings=api/api/settings.py

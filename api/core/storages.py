from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class PublicStorage(S3Boto3Storage):
    default_acl = "public-read"
    file_overwrite = False


class PublicMediaStorage(PublicStorage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION

import os

from datetime import datetime

from django.contrib.contenttypes.models import ContentType


def file_upload_path(instance, filename):
    """Returns the path to save the file upload.

    Parameters
    ----------
    instance : Model
        Django model instance.
    filename : str
        Name of the file.

    Returns
    -------
    str
        Path to save the file.
    """

    now = datetime.now()
    instance_ct = ContentType.objects.get_for_model(instance)

    return os.path.join(
        instance_ct.app_label,
        instance_ct.model,
        str(now.year),
        str(now.month),
        filename,
    )

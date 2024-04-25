import uuid
import os

from moveMarket_admin.settings import STATIC_URL, COMMON_STATIC_PATH
from django.core.files.storage import FileSystemStorage


def get_file_extension(filename):
    return filename.split(os.path.extsep)[-1]


def save_image(image):
    name = str(uuid.uuid4()) + os.path.extsep + get_file_extension(image.name)
    FileSystemStorage(location=COMMON_STATIC_PATH) \
        .save(name, image)
    return os.path.join(COMMON_STATIC_PATH, name)


def get_path_to_static(path):
    return os.path.join(STATIC_URL, os.path.split(path)[-1])

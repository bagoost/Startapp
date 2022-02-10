from django.db import models
from django.utils.translation import gettext_lazy as _


# This model should be used to build your own models on top of this one
class BaseModel(models.Model):
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

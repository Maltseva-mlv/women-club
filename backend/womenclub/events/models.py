from django.db import models

# Create your models here.
class Event(models.Model):
	date = models.DateField()
	subject = models.CharField(max_length=255)
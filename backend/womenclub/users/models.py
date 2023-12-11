from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
	pass

class Schedule(models.Model):
	subject = models.CharField(max_length=100)
	date = models.DateField()
	time = models.TimeField()
	def __str__(self):
		return f"{self.date} - {self.time.strftime('%d-%m-%Y')} {self.subject}"

	class Meta:
		verbose_name_plural = 'Расписание'

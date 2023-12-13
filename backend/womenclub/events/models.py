from django.db import models

# Create your models here.
class Event(models.Model):
	date = models.DateField()
	time = models.TimeField()
	subject = models.CharField(max_length=255)

	def __str__(self):
		return f"{self.date} - {self.time.strftime('%H:%M')} {self.subject}"
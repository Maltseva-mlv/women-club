from django.db import models
from users.models import Schedule
# Create your models here.
class Event(models.Model):
	date = models.DateField()
	time = models.TimeField()
	subject = models.CharField(max_length=255)

	def __str__(self):
		return f"{self.date} - {self.time.strftime('%H:%M')} {self.subject}"
	
class EventLecture(models.Model):
	lecture_name = models.CharField('Название лекции', max_length=100)
	link = models.URLField('Ссылка на лекцию')
	schedule = models.ForeignKey(Schedule, on_delete = models.CASCADE) 

	def __str__(self):
		return self.lecture_name
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

class Lecture(models.Model):
	lecture_name = models.CharField('Название лекции', max_length=100)
	link = models.URLField('Ссылка на лекцию')
	schedule = models.ForeignKey('Schedule', on_delete = models.CASCADE) 

	def __str__(self):
		return self.lecture_name
	
	class Meta:
		verbose_name = 'Лекция'
		verbose_name_plural = 'Лекции'
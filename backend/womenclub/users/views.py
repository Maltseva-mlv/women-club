from django.contrib.auth import authenticate, login
from django.views import View
from django.shortcuts import render, redirect
from .models import Schedule
from .forms import ScheduleForm
from users.forms import UserCreationForm

class Register(View):
	template_name = 'registration/register.html'

	def get(self, request):
		context = {
			'form': UserCreationForm()
		}
		return render(request, self.template_name, context)
	
	def post(self, request):
		form = UserCreationForm(request.POST)

		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password1')
			user = authenticate(username=username, password=password)
			login(request, user)
			return redirect('/')
		context = {
			'form': form
		}
		return render(request, self.template_name, context)

def profile(request):
	return render(request, 'users/profile.html')

def manage_schedule(request):
	schedule = Schedule.objects.order_by('date')
	return render(request, 'users/manage_schedule.html', {'schedule': schedule})
	
def add_schedule(request):

	error = ''
	form = ScheduleForm()
	
	if request.method == 'POST':
		form = ScheduleForm(request.POST)
		if form.is_valid():
			print(form.cleaned_data)
			form.save()
			return redirect('manage_schedule')
		else:
			error = 'Неверно'


	data = {
		'form': form,
		'error': error
	}
	return render(request, 'users/manage_schedule.html', data)

# def get_events(request):
# 	selected_date = request.GET.get('date')
# 	events = Schedule.objects.filter(date=selected_date)
# 	data = {'events': [{'date': event.date, 'subject': event.subject} for event in events]}
# 	return JsonResponse(data)
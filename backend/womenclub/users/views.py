from django.contrib.auth import authenticate, login
from django.views import View
from django.shortcuts import render, redirect
from .models import Schedule
from .forms import ScheduleForm
from users.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test

User = get_user_model()

@user_passes_test(lambda u: u.is_superuser)
def admin_register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            return redirect('profile')  
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


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

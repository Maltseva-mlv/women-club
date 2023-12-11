from django.shortcuts import render
from users.models import Schedule


def index(request):
	schedule = Schedule.objects.order_by('date')
	
	context = {
        'schedule': schedule,
    }

	return render(request, 'home/index.html', context)

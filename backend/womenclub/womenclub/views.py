from django.shortcuts import render
from users.models import Schedule

def index(request):
	schedule = Schedule.objects.order_by('date')
	
	context = {
        'schedule': schedule[:3],
    }

	return render(request, 'home/index.html', context)

def about(request):
	
	return render(request, 'about/main.html')


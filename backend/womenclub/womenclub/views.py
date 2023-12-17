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

def payment(request):
	amount = request.GET.get('amount', '0')

	data = {
		'amount': amount, 
	}
	return render(request, 'pay/pay.html', data)

from django.urls import path, include
from users.views import Register, profile
from . import views

urlpatterns = [
	path("",include('django.contrib.auth.urls')),
	path('register/', Register.as_view(), name='register'),
	path('profile/', profile, name='profile'),
	path('schedule/', views.manage_schedule, name='manage_schedule'),
	path('add_schedule/', views.add_schedule, name='add_schedule'),
	# path('api/events/', views.get_events, name='get_events'),
]

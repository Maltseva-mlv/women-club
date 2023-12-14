from django.urls import path, include
from users.views import profile
from . import views

urlpatterns = [
	path("",include('django.contrib.auth.urls')),
	path('profile/', profile, name='profile'),
	path('schedule/', views.manage_schedule, name='manage_schedule'),
	path('add_schedule/', views.add_schedule, name='add_schedule'),
    path('show_lectures', views.add_lecture, name='show_lectures'),
    # path('add_lecture/', views.add_lecture, name='add_lecture'),
]
urlpatterns += [
    path('admin_register_user/', views.admin_register_user, name='admin_register_user'),
]
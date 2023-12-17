from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework import routers
from events.views import ScheduleApi, LectureApi


router = routers.DefaultRouter()
router.register(r'api/events', ScheduleApi, basename='schedule')
router.register(r'api/lectures', LectureApi, basename='lecture')

urlpatterns = [
	path('', views.index, name='index'),
    path('users/', include('users.urls')),
	path('about/',  views.about, name='about'),
	path('payment/',  views.payment, name='payment'),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]


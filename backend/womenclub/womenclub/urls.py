from django.contrib import admin
from django.urls import include, path
from . import views
from rest_framework import routers
from events.views import ScheduleApi


router = routers.DefaultRouter()
router.register(r'api/events', ScheduleApi)
urlpatterns = [
	path('', views.index, name='index'),
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
	# path('api/events/', ScheduleApi.as_view({'get': 'list'}), name='event-list'),  # Добавлен этот путь
    # path('api/events/<str:date>/', get_events_for_date, name='get_events_for_date'),
    path('', include(router.urls)),
]


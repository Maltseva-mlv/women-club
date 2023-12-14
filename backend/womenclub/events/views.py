# events/views.py
from rest_framework import viewsets
from users.models import Schedule, Lecture
from .serializers import EventSerializer, EventLectureSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class ScheduleApi(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = EventSerializer

    @action(detail=False, methods=['GET'])
    def get_events_for_date(self, request):
        selected_date = request.query_params.get('date', None)

        if selected_date:
            events = Schedule.objects.filter(date=selected_date)
        else:
            events = self.queryset  
            
        serializer = EventSerializer(events, many=True)
        return Response({'events': serializer.data})


class LectureApi(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = EventLectureSerializer

    @action(detail=False, methods=['GET'])
    def get_lectures_for_date(self, request):
        lectures = self.queryset
        serializer = EventLectureSerializer(lectures, many=True)
        return Response({'lectures': serializer.data})
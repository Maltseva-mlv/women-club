from rest_framework import serializers
from users.models import Schedule, Lecture

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['date', 'time', 'subject']

class EventLectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['lecture_name', 'link', 'schedule']
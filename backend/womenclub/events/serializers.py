from rest_framework import serializers
from users.models import Schedule

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['date', 'subject']
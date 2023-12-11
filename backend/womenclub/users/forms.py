from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from .models import Schedule
from django.forms import ModelForm

User = get_user_model()
class UserCreationForm(UserCreationForm):
       class Meta:
        model = User  
        fields = ['username', 'email', 'password1', 'password2']

class ScheduleForm(ModelForm):
    class Meta:
       model = Schedule
       fields = [ 'subject','date', 'time']
from django import forms
from registration.forms import RegistrationForm
from .models import User

class CustomRegistrationForm(RegistrationForm):

    class Meta(RegistrationForm.Meta):
        model = User
        fields = RegistrationForm.Meta.fields + ('avatar',)
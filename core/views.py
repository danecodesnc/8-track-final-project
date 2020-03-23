from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse, JsonResponse
from .models import Album
# from .forms import 
from users.models import User
from django.db.models import Q

@login_required
def rec_list(request):
    return render(request, 'core/rec_list.html',)



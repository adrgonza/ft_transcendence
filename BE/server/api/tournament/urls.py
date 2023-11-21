from django.urls import path
from .views import *


urlpatterns = [
    path('tournament/create/', touprnament_create, name="create"),
    path('tournament/list/', tournament_list, name="list"),
    path('tournament/delete/<int:tournament_id>/', tournament_delete, name='tournament_delete'),
    path('tournament/update/<int:tournament_id>/', tournament_update, name='tournament_update'),
    path('match/create/', match_create, name='creatematch'),
    path('match/list/', match_list, name='listmatches'),
    path('match/delete/<int:match_id>/', match_delete, name='deletematch'),
    path('match/update/<int:match_id>/', match_update, name='updatematch'),

    path('user/create/', user_create, name='user_create'),
    path('user/list/', user_list, name='user_list'),
    path('user/delete/<int:user_id>/', user_delete, name='user_delete'),
    path('user/update/<int:user_id>/', user_update, name='user_update'),
]

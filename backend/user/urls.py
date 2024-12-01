from django.urls import path
from . import views

app_name = 'user'

urlpatterns = [
    path('create_user/', views.create_user, name='create_user'),
    path('login_user/', views.login_user, name='login_user'),
    path('get_top/', views.get_top_user, name='get_top_user'),
    path('get_user_record/', views.get_user_record, name='get_user_record'),
    path('update_user_record/', views.update_user_record, name='update_user_record'),
]

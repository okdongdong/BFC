from django.urls import path
from . import views

urlpatterns = [
  path('<int:full_course_id>/<int:user_id>/', views.get_wish_list, name='get_wish_list'),
]
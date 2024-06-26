from django.urls import path
from . import views

urlpatterns = [
    path('student/<int:id>/', views.student_detail, name='student_detail'),
    path('', views.student_result, name='student_result'),
    path('api/student/<int:id>/', views.student_detail_api, name='student_detail_api'),
]

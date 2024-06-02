from django.urls import path

from . import views

urlpatterns = [
    path("capture-webcam/", views.CaptureWebcamAPIView.as_view()),
]

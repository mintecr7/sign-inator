from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError


class CaptureWebcamAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if "imageFile" not in request.data:
            raise ParseError(
                code="invalid_request",
                detail="imageFile is missing in request body.",
            )

        image_file = request.data["imageFile"]
        default_storage.save("image_file.jpg", ContentFile(image_file.read()))

        return Response(None)

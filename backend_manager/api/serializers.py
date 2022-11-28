from rest_framework.serializers import ModelSerializer
from .models import Photo, User, MuseumPhoto


class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MuseumPhotoSerializer(ModelSerializer):
    class Meta:
        model = MuseumPhoto
        fields = '__all__'

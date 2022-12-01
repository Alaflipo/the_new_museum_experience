from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Photo, User, MuseumPhoto
from .serializers import PhotoSerializer, UserSerializer, MuseumPhotoSerializer
from django.core.files.base import ContentFile
import datetime
import base64
import cv2
import numpy as np
import os
from collections import defaultdict
import openai
import random
import json
from django.db.models import Q

# Create your views here.


@api_view(['GET'])
def get_photos_user(request, user):
    photos = Photo.objects.filter(user=user)
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_dalle_creations(request):
    dalle_creations = Photo.objects.filter(~Q(dalle=None))
    serializer = PhotoSerializer(dalle_creations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_users(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request, user):
    user = User.objects.get(id=user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_museum_image_data(request, image):
    museum_photo = MuseumPhoto.objects.get(id=image)
    serializer = MuseumPhotoSerializer(museum_photo, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_photo(request, id):
    photo = Photo.objects.get(id=id)
    photo.delete()
    return Response('activity was deleted!')


@api_view(['POST'])
def add_user(request):
    data = request.data
    user = User.objects.create(
        name=data['name']
    )
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


def get_tagged_painting(image, paintings):
    orb = cv2.ORB_create(700)  # ORB Init
    index_det = dict(algorithm=6, table_number=10,
                     key_size=20, multi_probe_level=0)
    search = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_det, search)  # Flann Init

    for painting in paintings:
        print(painting.img_path.url)
        img2 = cv2.imread('.' + painting.img_path.url, 0)
        kp2, des2 = orb.detectAndCompute(img2, None)
        flann.add([des2])  # Add each image descriptor to flann
    flann.train()

    kp1, des1 = orb.detectAndCompute(image, None)
    matches = flann.match(des1)
    matches_dict = defaultdict(lambda: 0)
    for f in matches:
        matches_dict[f.imgIdx] += 1
    temp = sorted(matches_dict.items(), key=lambda x: x[1], reverse=True)

    if (len(temp) > 0):
        index = next(iter(temp))
        painting_guess = paintings[list(index)[0]]
        return painting_guess
    else:
        return None


@api_view(['POST'])
def add_photo(request):
    data = request.data
    user = User.objects.get(id=data['user'])

    # Create picture for django format
    format, imgstr = data['photo'].split(';base64,')
    ext = format.split('/')[-1]
    pic = ContentFile(base64.b64decode(imgstr),
                      name='image' + data['user'] + '.' + ext)

    # Check which picture matches
    nparr = np.fromstring(base64.b64decode(imgstr), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    all_museum_photos = MuseumPhoto.objects.all()

    # What painting does the AI think it is...
    painting_guess = get_tagged_painting(img, all_museum_photos)

    photo = Photo.objects.create(
        user=user,
        museumphoto=painting_guess,
        photo=pic,
        date=datetime.datetime.now()
    )
    serializer = PhotoSerializer(photo, many=False)

    return Response(serializer.data)


def get_dalle_painting(prompt: str):
    openai.api_key = "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"

    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return image_url


def get_prompt(photos):
    filtered_photos = list(
        filter(lambda photo: photo.museumphoto != None and photo.dalle == None, photos))
    if (len(filtered_photos) <= 0):
        return None

    prompt = ''
    for photo in filtered_photos:
        random_tag = random.choice(eval(photo.museumphoto.tags))
        prompt += random_tag + ' '

    random_painting = random.choice(filtered_photos)
    prompt += 'in the style of ' + random_painting.museumphoto.painter
    print('prompt:', prompt)
    return prompt


@api_view(['POST'])
def create_art(request, user):
    user = User.objects.get(id=user)
    photos = Photo.objects.filter(user=user)

    prompt = get_prompt(photos)
    if prompt == None:
        return Response(None)

    image_url = get_dalle_painting(prompt)

    photo = Photo.objects.create(
        user=user,
        museumphoto=None,
        photo=None,
        dalle=image_url,
        prompt=prompt,
        date=datetime.datetime.now()
    )
    serializer = PhotoSerializer(photo, many=False)

    return Response(serializer.data)

from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'


class MuseumPhoto(models.Model):
    name = models.CharField(max_length=100)
    painter = models.CharField(max_length=100)
    img_path = models.ImageField(null=True, blank=True,
                                 upload_to='museum_images/')
    tags = models.CharField(max_length=300)
    description = models.TextField(blank=True)

    def __str__(self):
        return f'{self.name}'


class Photo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    museumphoto = models.ForeignKey(
        MuseumPhoto, on_delete=models.CASCADE, default=1, null=True)
    photo = models.ImageField(null=True, blank=True, upload_to='images/')
    dalle = models.TextField(null=True, default=None)
    prompt = models.TextField(null=True, default=None)
    date = models.DateTimeField('photo date')

    def __str__(self):
        return f'{self.user.name} took a photo on {self.date} '

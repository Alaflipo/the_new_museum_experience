# Generated by Django 4.1.3 on 2022-11-27 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_photo_museumphoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='dalle',
            field=models.TextField(default=None, null=True),
        ),
    ]

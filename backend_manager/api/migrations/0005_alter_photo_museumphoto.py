# Generated by Django 4.1.3 on 2022-11-27 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_museumphoto_photo_museumphoto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='museumphoto',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.museumphoto'),
        ),
    ]
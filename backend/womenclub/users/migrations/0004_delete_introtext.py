# Generated by Django 5.0 on 2023-12-17 13:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_introtext'),
    ]

    operations = [
        migrations.DeleteModel(
            name='IntroText',
        ),
    ]
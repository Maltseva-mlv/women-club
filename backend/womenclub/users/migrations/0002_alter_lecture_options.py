# Generated by Django 5.0 on 2023-12-14 15:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lecture',
            options={'verbose_name': 'Лекция', 'verbose_name_plural': 'Лекции'},
        ),
    ]
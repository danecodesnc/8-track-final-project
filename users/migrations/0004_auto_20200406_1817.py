# Generated by Django 3.0.4 on 2020-04-06 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200406_1814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='https://tinyurl.com/que5mwt', upload_to=''),
        ),
    ]

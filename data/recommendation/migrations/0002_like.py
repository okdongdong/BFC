# Generated by Django 3.2.12 on 2022-03-31 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('like_id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'like',
                'managed': False,
            },
        ),
    ]
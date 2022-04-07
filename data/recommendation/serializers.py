# from re import L
# from attr import fields
from django.db import models
# from itsdangerous import Serializer
from .models import Recommend, SurveyRecommend
from rest_framework import serializers

class RecommendSerializer(serializers.ModelSerializer) :
  class Meta :
    model = Recommend
    fields = '__all__'


class SurveyRecommendSerializer(serializers.ModelSerializer) :
  class Meta :
    model = SurveyRecommend
    fields = '__all__'

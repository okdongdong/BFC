from unicodedata import category
from django.shortcuts import render
from numpy import full
import pandas as pd
import random
from django.db import connection
from django.db.models import Q
from recommendation.models import Place,SurveyRecommend, Interest, WishFood, WishPlace

from recommendation.recomm import fullCourseSurveyRecomm,fullcourse_survey_place_recommendations

# Create your views here.

def get_wish_list(request, full_course_id, user_id):
  # 관광지
  wish_place_labels = list(WishPlace.objects.filter(full_course=full_course_id).values('keyword'))
  # 유사도 측정
  cosine_sim_df, data = fullCourseSurveyRecomm()
  if len(wish_place_labels) > 0 : # 가고싶은 관광지 선택했을 경우
    wish_place_random =[]
    for wish_place_keyword in wish_place_labels :
      wish_place_random.append(random.choice(list(Place.objects.filter(label=wish_place_keyword['keyword']).values('name'))))

    # 추천
    place_id_list = set()
    for _ in range(len(wish_place_random)) :
      tmp_place_id_list=fullcourse_survey_place_recommendations(wish_place_random[_]['name'],cosine_sim_df, data, full_course_id)
      for tmp_place_id in tmp_place_id_list :
        place_id_list.add(tmp_place_id)
    
    place_id_list = list(place_id_list)
    print(place_id_list)

    bulk_list =[]

    for i in range(len(place_id_list)) :
      bulk_list.append(SurveyRecommend(
        full_course_id=full_course_id,
        place_id=place_id_list[i]
      ))
    SurveyRecommend.objects.bulk_create(bulk_list)

  else : # 가고싶은 관광지가 없는 경우
    cursor = connection.cursor()
    strSql = "SELECT I.place_id, P.name, P.category FROM Interest I INNER JOIN Place P ON I.place_id = P.place_id  WHERE I.user_id = "+ str(user_id) +" and P.category=0"
    result = cursor.execute(strSql)
    Interest_place = cursor.fetchall()
    connection.close()
    df_Interest_place = pd.DataFrame(data = Interest_place, columns=['place_id','name','category'])
    if len(df_Interest_place) : # 관심 관광지가 있는 경우

      list_Interest_place = df_Interest_place['name'].tolist()
      place_id_list = set()
      for _interest_place in list_Interest_place :
        tmp_place_id_list=fullcourse_survey_place_recommendations(_interest_place,cosine_sim_df, data, full_course_id)
        for tmp_place_id in tmp_place_id_list :
          place_id_list.add(tmp_place_id)

      place_id_list = list(place_id_list)

      bulk_list =[]

      for i in range(len(place_id_list)) :
        bulk_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=place_id_list[i]
        ))
      SurveyRecommend.objects.bulk_create(bulk_list)
    else : # 관심 관광지가 없는 경우 ( 관광지 인기순 )
      place_id_list = list(Place.objects.filter(Q(category = 0) & Q(score_count__gte=30)).order_by('-average_score')[:10].values('place_id'))
      print(place_id_list)
      bulk_list =[]

      for i in range(len(place_id_list)) :
        bulk_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=place_id_list[i]['place_id']
        ))
      SurveyRecommend.objects.bulk_create(bulk_list)

  # 음식점
  # wish_food_list = list(WishFood.objects.filter(full_course=full_course_id))

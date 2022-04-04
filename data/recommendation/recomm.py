import csv
import pandas as pd
import numpy as np
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def fullCourseSurveyRecomm():
  data = pd.read_csv("./file/관광지+테마키워드.csv", encoding='cp949')
  data = data[['place_id','name','theme_keyword']]

  data['theme_keyword'] = data['theme_keyword'].apply(literal_eval)
  data['theme_keyword'] = data['theme_keyword'].apply(lambda x : " ".join(x))

  tfidf_vector = TfidfVectorizer()
  tfidf_matrix = tfidf_vector.fit_transform(data['theme_keyword']).toarray()
  tfidf_matrix_feature = tfidf_vector.get_feature_names_out()

  tfidf_matrix = pd.DataFrame(tfidf_matrix, columns=tfidf_matrix_feature, index = data.name)
  
  # 유사도 구하기
  cosine_sim = cosine_similarity(tfidf_matrix)
  cosine_sim_df = pd.DataFrame(cosine_sim, index = data.name, columns = data.name)

  return cosine_sim_df, data

def fullcourse_survey_place_recommendations(target_name, matrix, items, full_course_id, k=10) :
  print('=========================')
  print(target_name)
  recom_idx = matrix.loc[:, target_name].values.reshape(1, -1).argsort()[:, ::-1].flatten()[:k]
  full_course_id = full_course_id
  place_id = items.iloc[recom_idx, :].place_id.values
  print(full_course_id, place_id)
  print(items.iloc[recom_idx, :].name.values)
  return place_id
  # return pd.DataFrame(d)
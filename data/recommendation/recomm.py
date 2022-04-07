import csv
import pandas as pd
import numpy as np
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from recommendation.models import Score

def fullCourseSurveyRecomm():
  data = pd.read_csv("./file/tour_keyword.csv", encoding='cp949')
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

def fullcourse_survey_place_recommendations(target_name, matrix, items, full_course_id, k=8) :

  recom_idx = matrix.loc[:, target_name].values.reshape(1, -1).argsort()[:, ::-1].flatten()[:k]
  full_course_id = full_course_id
  place_id = items.iloc[recom_idx, :].place_id.values
  # print(full_course_id, place_id)
  # print(items.iloc[recom_idx, :].name.values)
  return place_id
  # return pd.DataFrame(d)

def get_all_user_rating() :
      # 리뷰데이터
    food_rating_data = pd.read_csv('./file/food_review.csv',encoding='cp949',index_col = 0)
    # 크롤링 - 유의미한 리뷰어만 남기기
    user_counts = food_rating_data['user_id'].value_counts().reset_index(name='counts')
    user_counts.columns = ['user_id','user_rank_counts']
    user_counts = user_counts.loc[user_counts['user_rank_counts'] >= 30]
    user_rank_ls = user_counts['user_id'].values.tolist()
    user_review_data = food_rating_data.loc[food_rating_data['user_id'].isin(user_rank_ls)]
    user_review_data.drop(['title','reviewer','review'], axis = 1, inplace=True)
    user_review_data.columns = ['score','place_id','user_id']

    # 우리사이트 - 유의미한 리뷰어(리뷰 10개이상)
    my_user_rating = pd.DataFrame(Score.objects.all().values('user_id','place_id','score'))
    my_user_counts = my_user_rating['user_id'].value_counts().reset_index(name = 'counts')
    my_user_counts.columns = ['user_id','user_rank_counts']
    my_user_counts = my_user_counts.loc[my_user_counts['user_rank_counts'] >= 1] 
    my_user_rank_ls = my_user_counts['user_id'].values.tolist()
    my_user_review_data = my_user_rating.loc[my_user_rating['user_id'].isin(my_user_rank_ls)]
    
    # 최종 유의미한 리뷰어
    all_user_rating = pd.concat([my_user_review_data,user_review_data], ignore_index=True) 

    return all_user_rating

def food_recomm_byUser(df_svd_preds, user_id, user_idd, ori_place_df, ori_ratings_df, num_recommendations=5):
    
    user_row_number = user_id
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
    user_data = ori_ratings_df[ori_ratings_df.user_id == user_idd]
    user_history = user_data.merge(ori_place_df, on = 'place_id').sort_values(['score'], ascending=False)
    recommendations = ori_place_df[~ori_place_df['place_id'].isin(user_history['place_id'])]

    recommendations = recommendations.merge( pd.DataFrame(sorted_user_predictions).reset_index(), on = 'place_id')

    recommendations = recommendations.rename(columns = {user_row_number: 'Predictions'}).sort_values('Predictions', ascending = False).iloc[:num_recommendations, :]
                      

    return recommendations
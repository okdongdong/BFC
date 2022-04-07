# from unicodedata import category
from telnetlib import STATUS
from unicodedata import category
from django.http import HttpResponse
from django.shortcuts import render
# from numpy import full
import pandas as pd
import numpy as np
import random
from django.db import connection
from django.db.models import Q
from recommendation.models import Place,SurveyRecommend, Interest, WishFood, WishPlace, Recommend, Score, User, MainRecommend

from recommendation.recomm import fullCourseSurveyRecomm,fullcourse_survey_place_recommendations,get_all_user_rating, food_recomm_byUser

from sklearn.decomposition import TruncatedSVD
from sklearn.metrics import mean_squared_error 
from scipy.sparse.linalg import svds

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
    
    if len(place_id_list) > 40 :
      place_id_list = random.sample(place_id_list, 40)

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

      if len(place_id_list) > 40 :
        place_id_list = random.sample(place_id_list,40)

      bulk_list =[]

      for i in range(len(place_id_list)) :
        bulk_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=place_id_list[i]
        ))
      SurveyRecommend.objects.bulk_create(bulk_list)
    else : # 관심 관광지가 없는 경우 ( 관광지 인기순 )
      place_id_list = list(Place.objects.filter(Q(category = 0) & Q(score_count__gte=30)).order_by('-average_score')[:8].values('place_id'))
      # print(place_id_list)
      bulk_list =[]

      for i in range(len(place_id_list)) :
        bulk_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=place_id_list[i]['place_id']
        ))
      SurveyRecommend.objects.bulk_create(bulk_list)

  # 음식점

  wish_food_labels = list(WishFood.objects.filter(full_course=full_course_id).values('keyword'))
  # 해당 키워드를 가진 음식점 리뷰 좋은것 10 개 중 랜덤으로 한 가게 뽑기
  if len(wish_food_labels) > 0 : # 좋아하는 음식점 라벨 선택한 경우
    
    # 최종 유의미한 리뷰어
    all_user_rating = get_all_user_rating()
    food_data = pd.DataFrame(list(Place.objects.filter(category=1).values('place_id','name')))

    # 추천
    user_food_data = pd.merge(all_user_rating, food_data, on ='place_id')
    user_food_rating = user_food_data.pivot_table('score', index = 'user_id', columns = "place_id").fillna(0)
    food_user_rating = user_food_rating.values.T

    SVD = TruncatedSVD(n_components=12) # latent 값 12로 둠
    matrix = SVD.fit_transform(food_user_rating)

    corr = np.corrcoef(matrix)
    food_id = user_food_rating.columns
    food_id_list = list(food_id)

    # 해당 라벨 가진 음식점
    wish_food_random = []
    for wish_food_keyword in wish_food_labels :
      tmp = pd.DataFrame(Place.objects.filter(Q(label=wish_food_keyword['keyword']) & Q(score_count__gte=15)).order_by('-average_score')[:10].values('place_id'))
      tmp = random.choice(list(tmp.loc[tmp['place_id'].isin(food_id_list)]['place_id']))
      wish_food_random.append(tmp)
    print(wish_food_random)

    recomm_food_ls = set()
    for wish_food in wish_food_random :
      coffey_hands = food_id_list.index(wish_food)
      corr_coffey_hands = corr[coffey_hands]
      tmp_recomm_food_ls = list(food_id[(corr_coffey_hands) >= 0.9])[:8]
      for tmp_recomm_food in tmp_recomm_food_ls :
        recomm_food_ls.add(tmp_recomm_food)
    recomm_food_ls = list(recomm_food_ls)

    if len(recomm_food_ls) > 40 :
      recomm_food_ls = random.sample(recomm_food_ls, 40)

    bulk_food_list =[]

    for i in range(len(recomm_food_ls)) :
      bulk_food_list.append(SurveyRecommend(
        full_course_id=full_course_id,
        place_id=recomm_food_ls[i]
      ))
    SurveyRecommend.objects.bulk_create(bulk_food_list)

  else : # 좋아하는 음식점 라벨 선택 X
    
    curr_user_ratings = pd.DataFrame(Score.objects.filter(user_id=user_id).values('user_id','place_id','score'))

    if len(curr_user_ratings) >= 10 : # 10개 이상 리뷰를 남긴 경우에만 개인 추천
      food_rating_data = get_all_user_rating()
      food_data = pd.DataFrame(list(Place.objects.filter(category=1).values('place_id','name')))

      user_food_data = pd.merge(food_rating_data, food_data, on = 'place_id')
      df_user_food_ratings = food_rating_data.pivot_table(index='user_id',columns='place_id',values='score').fillna(0)
      user_ls = list(df_user_food_ratings.index)
      # 추천
      matrix = df_user_food_ratings.to_numpy()
      user_ratings_mean = np.mean(matrix, axis = 1)
      matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)

      U, sigma, Vt = svds(matrix_user_mean, k = 12)
      sigma = np.diag(sigma)
      svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)

      df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns = df_user_food_ratings.columns)

      for i in range(len(user_ls)) :
        if user_ls[i] == user_id :
          user_index = i
          break

      predictions = food_recomm_byUser(df_svd_preds, user_index, user_id, food_data, food_rating_data, 10)
      food_id_list = list(predictions['place_id'])

      bulk_food_list =[]

      for i in range(len(food_id_list)) :
        bulk_food_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=food_id_list[i]
        ))
      SurveyRecommend.objects.bulk_create(bulk_food_list)

    # 아무런 정보가 없을 시, 인기순
    else :
      food_id_list = list(Place.objects.filter(Q(category = 1) & Q(score_count__gte=40)).order_by('-average_score')[:8].values('place_id'))
      print(food_id_list)
      bulk_list =[]

      for i in range(len(food_id_list)) :
        bulk_list.append(SurveyRecommend(
          full_course_id=full_course_id,
          place_id=food_id_list[i]['place_id']
        ))
      SurveyRecommend.objects.bulk_create(bulk_list)
  
  return HttpResponse(status = 200)



def new_user(request, user_id) :
	# 관광지 인기순
	place_popular_list = list(Place.objects.filter(Q(category = 0) & Q(score_count__gte=20)).order_by('-average_score')[:20].values('place_id'))
	food_popular_list = list(Place.objects.filter(Q(category = 1) & Q(score_count__gte=30)).order_by('-average_score')[:20].values('place_id'))


	place_popular_list = random.sample(place_popular_list, 10)
	food_popular_list = random.sample(food_popular_list, 10)
	print(place_popular_list)
	print(food_popular_list)

	bulk_list = []

	for i in range(len(place_popular_list)) :
		bulk_list.append(Recommend(
			user_id = user_id,
			place_id = place_popular_list[i]['place_id'],
			category = 0
		))

	for i in range(len(food_popular_list)) :
		bulk_list.append(Recommend(
			user_id = user_id,
			place_id = food_popular_list[i]['place_id'],
			category = 1
		))

	Recommend.objects.bulk_create(bulk_list)
	MainRecommend.objects.bulk_create(bulk_list)

	return HttpResponse(STATUS = 200)

def rmse_function(R, P, Q, zero_matrix):
	full_matrix = np.dot(P, Q.T)
	
	a = [matrix[0] for matrix in zero_matrix]
	b = [matrix[1] for matrix in zero_matrix]
	R_zero = R[a, b]

	full_matrix_zero = full_matrix[a, b]
	mse = mean_squared_error(R_zero, full_matrix_zero)
	rmse = np.sqrt(mse)
	return rmse

def food_user_matrix(our_list):
	our_user = pd.DataFrame(list(Score.objects.all().values()))
	our_user = our_user[['user_id', 'place_id', 'score']]

	rating_data = pd.read_csv('./file/subfood_review.csv', encoding='utf-8', index_col=0)
	user_count = rating_data['user_id'].value_counts().reset_index(name='score')
	user_count.columns = ['user_id', 'count']
	user_counts = user_count[user_count['count'] > 50]
	user_list = user_counts['user_id'].values.tolist()
	sample_list = random.sample(user_list, 500)

	check_list = sample_list + our_list
	rating = pd.concat([our_user, rating_data])
	user = rating.loc[rating['user_id'].isin(check_list)]
	user.dropna(subset=['score'], axis=0, inplace=True)

	MeanUser = user.groupby(['user_id']).mean().reset_index()
	MeanUser['mean_rating'] = MeanUser['score']
	MeanUser.drop(['place_id', 'score'], axis=1, inplace=True)
	# user테이블, 보정값 포함
	user = pd.merge(user, MeanUser, on=['user_id', 'user_id'])
	# 값 보정
	user['dev'] = user.apply(lambda x: x['score']-x['mean_rating'], axis=1)
	user_place = user.pivot_table('dev', index='user_id', columns='place_id').fillna(0)
	# 고객간의 유사도
	UserUser = user_place.dot(user_place.transpose())
	# 대각선값들 0으로 전부 만들어주기
	np.fill_diagonal(UserUser.to_numpy(), 0)
	return UserUser, user

def tour_user_matrix(our_list):
	our_user = pd.DataFrame(list(Score.objects.all().values()))
	our_user = our_user[['user_id', 'place_id', 'score']]

	rating_data = pd.read_csv('./file/subtour_review.csv', encoding='utf-8', index_col=0)
	user_count = rating_data['user_id'].value_counts().reset_index(name='score')
	user_count.columns = ['user_id', 'count']
	user_counts = user_count[user_count['count'] > 3]
	user_list = user_counts['user_id'].values.tolist()
	sample_list = random.sample(user_list, 500)

	check_list = sample_list + our_list
	rating = pd.concat([our_user, rating_data])
	user = rating.loc[rating['user_id'].isin(check_list)]
	user.dropna(subset=['score'], axis=0, inplace=True)

	MeanUser = user.groupby(['user_id']).mean().reset_index()
	MeanUser['mean_rating'] = MeanUser['score']
	MeanUser.drop(['place_id', 'score'], axis=1, inplace=True)
	# user테이블, 보정값 포함
	user = pd.merge(user, MeanUser, on=['user_id', 'user_id'])
	# 값 보정
	user['dev'] = user.apply(lambda x: x['score']-x['mean_rating'], axis=1)
	user_place = user.pivot_table('dev', index='user_id', columns='place_id').fillna(0)
	# 고객간의 유사도
	UserUser = user_place.dot(user_place.transpose())
	# 대각선값들 0으로 전부 만들어주기
	np.fill_diagonal(UserUser.to_numpy(), 0)
	return UserUser, user


# 메인페이지 회원 추천	
def food_main_save(request):
	# 추천 초기화
	MainRecommend.objects.all().delete()
	
  # 유저 정보 가져오기
	users = list(User.objects.all().values('user_id'))
	place_df = pd.DataFrame(list(Place.objects.all().values('place_id')))
	our_score_df = pd.DataFrame(list(Score.objects.all().values('user_id','place_id', 'score')))
	our_score_df.columns = ['user_id', 'place_id', 'score']

	# 리뷰데이터 가져오기
	review_rating = pd.read_csv('./file/subfood_review.csv',encoding='utf-8',index_col=0)
	top2000 = review_rating[review_rating['user_id'].isin(review_rating['user_id'].value_counts()[:2000].index)]
	# 데이터 합치기
	rating = pd.concat([top2000, our_score_df], ignore_index=True)
	rating.dropna(subset=['score'], axis=0, inplace=True)
	user_place_rating = pd.pivot_table(rating, index='user_id', columns='place_id', values='score').fillna(0)
	place_user_rating = user_place_rating.T

	SVD = TruncatedSVD(n_components=12)
	matrix = SVD.fit_transform(place_user_rating)
	corr = np.corrcoef(matrix)
	place_column = user_place_rating.columns
	place_list = list(place_column)

	df = pd.DataFrame(columns=['place_id', 'similar_place_id'])
	for place_id in place_list:
		corr_hand = place_list.index(place_id)
		corr_food_hands = corr[corr_hand]
		# 10개만 추출
		simliar_place = list(place_column[(corr_food_hands >= 0.9)])[:11]
		for simliar_id in simliar_place:
			if simliar_id != place_id:
				df = df.append({
					'place_id': place_id,
					'similar_place_id': simliar_id,
				}, ignore_index=True)

	df = pd.merge(df, place_df, how='left', on='place_id')
	bulk = []
	for user in users:
		# 해당 유저가 좋아하는 장소 모음 리스트
		interest = list(Interest.objects.filter(user=user['user_id']).values('place'))
		lst = []
		for i in range(len(interest)):
			lst.append(interest[i]['place'])
		# 해당 유저가 좋아하는 장소들만 추출
		interest_df = df.loc[df['place_id'].isin(lst)]
		
		# 해당 장소들을 돌면서 
		if len(interest_df) <= 10:
			place_id_list = random.sample(list(Place.objects.filter(Q(category = 1) & Q(score_count__gte=30)).order_by('-average_score')[:30].values('place_id')),10)
			for i in place_id_list:
				bulk.append(MainRecommend(user_id=user['user_id'], place_id=i['place_id'], category=1))
		else:
			for i in range(len(interest_df)):
				bulk.append(MainRecommend(user_id=user['user_id'], place_id=interest_df.iloc[i]['similar_place_id'], category=interest_df.iloc[i]['category']))

	MainRecommend.objects.bulk_create(bulk)

def tour_main_save(request):
	MainRecommend.objects.all().delete()

	# 유저 정보 가져오기
	users = list(User.objects.all().values('user_id'))
	place_df = pd.DataFrame(list(Place.objects.all().values('place_id')))
	our_score_df = pd.DataFrame(list(Score.objects.all().values('user_id','place_id', 'score')))
	our_score_df.columns = ['user_id', 'place_id', 'score']

	# 리뷰데이터 가져오기
	review_rating = pd.read_csv('./file/subtour_review.csv',encoding='utf-8',index_col=0)
	top2000 = review_rating[review_rating['user_id'].isin(review_rating['user_id'].value_counts()[:1000].index)]
	# 데이터 합치기
	rating = pd.concat([top2000, our_score_df], ignore_index=True)
	rating.dropna(subset=['score'], axis=0, inplace=True)
	user_place_rating = pd.pivot_table(rating, index='user_id', columns='place_id', values='score').fillna(0)
	place_user_rating = user_place_rating.T

	SVD = TruncatedSVD(n_components=12)
	matrix = SVD.fit_transform(place_user_rating)
	corr = np.corrcoef(matrix)
	place_column = user_place_rating.columns
	place_list = list(place_column)

	df = pd.DataFrame(columns=['place_id', 'similar_place_id'])
	for place_id in place_list:
		corr_hand = place_list.index(place_id)
		corr_food_hands = corr[corr_hand]
		# 10개만 추출
		simliar_place = list(place_column[(corr_food_hands >= 0.9)])[:11]
		for simliar_id in simliar_place:
			if simliar_id != place_id:
				df = df.append({
					'place_id': place_id,
					'similar_place_id': simliar_id,
				}, ignore_index=True)

	df = pd.merge(df, place_df, how='left', on='place_id')
	bulk = []
	for user in users:
		# 해당 유저가 좋아하는 장소 모음 리스트
		interest = list(Interest.objects.filter(user=user['user_id']).values('place'))
		lst = []
		for i in range(len(interest)):
			lst.append(interest[i]['place'])
		# 해당 유저가 좋아하는 장소들만 추출
		interest_df = df.loc[df['place_id'].isin(lst)]
		
		# 해당 장소들을 돌면서
		if len(interest_df) <= 10:
			place_id_list = random.sample(list(Place.objects.filter(Q(category = 0) & Q(score_count__gte=30)).order_by('-average_score')[:20].values('place_id')),10)
			for i in place_id_list:
				bulk.append(MainRecommend(user_id=user['user_id'], place_id=i['place_id'], category=0))
		else:
			for i in range(len(interest_df)):
				bulk.append(MainRecommend(user_id=user['user_id'], place_id=interest_df.iloc[i]['similar_place_id'], category=interest_df.iloc[i]['category']))

	MainRecommend.objects.bulk_create(bulk)


def food_predict_score(request):
	Recommend.objects.all().delete()
	our_user = pd.DataFrame(list(Score.objects.all().values()))
	our_user = our_user[['user_id', 'place_id', 'score']]
	our_counts = our_user['user_id'].value_counts().reset_index(name='counts')
	our_list = our_counts['index'].values.tolist()
	
	# 테이블 만들기
	UserUser, user = food_user_matrix(our_list)
	
	for people in our_list:
		simliar_userlist = UserUser.sort_values(by=people, ascending=False)[people].to_frame().index
		simliar_user = np.append(simliar_userlist[0:200].values, [people])
		simliar_matrix = user.loc[user['user_id'].isin(simliar_user)].pivot_table('score', index='user_id', columns='place_id').fillna(0)

		# 정규화 만들기
		user_row, place_col = simliar_matrix.shape
		P = np.random.normal(scale=1./100, size=(user_row, 200))
		Q = np.random.normal(scale=1./100, size=(place_col, 200))

		# u_zero = np.zeros(user_row)
		# d_zero = np.zeros(place_col)
		# b_zero = np.mean(simliar_matrix.values[simliar_matrix.values.nonzero()])

		rows, cols = simliar_matrix.values.nonzero()
		sample_matrix = [(i, j, simliar_matrix.values[i,j]) for i, j in zip(rows, cols)]

		for step in range(200):
			for i, j, k in sample_matrix:
				diff = k - np.dot(P[i, :], Q[j, :].T)
				P[i, :] += 0.01 * (diff * Q[j, :] - 0.01 * P[i, :])
				Q[j, :] += 0.01 * (diff * P[i, :] - 0.01 * Q[j, :])
			rmse = rmse_function(simliar_matrix.values, P, Q, sample_matrix)
			if step % 10 == 0:
				print("Iteration: %d ; Train RMSE = %.4f " % (step, rmse))
	
		pred_matrix = np.dot(P, Q.T)
		pred_df = pd.DataFrame(np.round(pred_matrix, 3), columns= simliar_matrix.columns)
		pred_df = pred_df.set_index(keys=simliar_matrix.index)
		user_predict = pred_df[pred_df.index==people].T
		user_predict = user_predict.reset_index()
		user_predict['user_id'] = people
		user_predict.columns=['place_id', 'pred_score', 'user_id']
		user_predict = user_predict.sort_values(by=['pred_score'], ascending=False)[:10]

		bulk = []
		for i in range(len(user_predict)):
			bulk.append(Recommend(user_id=int(user_predict.iloc[i]['user_id'], place_id=int(user_predict.iloc[i]['place_id'], category=1))))

	our_id = set(pd.DataFrame(list(Score.objects.all().values()))['user_id'].tolist())
	all_id = set(pd.DataFrame(list(User.objects.all().values()))['user_id'].tolist())
	sub_list = list(all_id - our_id)
	for user_number in sub_list:
		place_id_list = random.sample(list(Place.objects.filter(Q(category = 1) & Q(score_count__gte=30)).order_by('-average_score')[:50].values('place_id')),10)
		for place_number in place_id_list:
			bulk.append(Recommend(user_id=user_number,place_id=place_number ,category=1))


	Recommend.objects.bulk_create(bulk)

def tour_predict_score(request):
	Recommend.objects.all().delete()
	our_user = pd.DataFrame(list(Score.objects.all().values()))
	our_user = our_user[['user_id', 'place_id', 'score']]
	our_counts = our_user['user_id'].value_counts().reset_index(name='counts')
	our_list = our_counts['index'].values.tolist()
	
	# 테이블 만들기
	UserUser, user = food_user_matrix(our_list)
	
	for people in our_list:
		simliar_userlist = UserUser.sort_values(by=people, ascending=False)[people].to_frame().index
		simliar_user = np.append(simliar_userlist[0:200].values, [people])
		simliar_matrix = user.loc[user['user_id'].isin(simliar_user)].pivot_table('score', index='user_id', columns='place_id').fillna(0)

		# 정규화 만들기
		user_row, place_col = simliar_matrix.shape
		P = np.random.normal(scale=1./100, size=(user_row, 200))
		Q = np.random.normal(scale=1./100, size=(place_col, 200))

		# u_zero = np.zeros(user_row)
		# d_zero = np.zeros(place_col)
		# b_zero = np.mean(simliar_matrix.values[simliar_matrix.values.nonzero()])

		rows, cols = simliar_matrix.values.nonzero()
		sample_matrix = [(i, j, simliar_matrix.values[i,j]) for i, j in zip(rows, cols)]

		for step in range(200):
			for i, j, k in sample_matrix:
				diff = k - np.dot(P[i, :], Q[j, :].T)
				P[i, :] += 0.01 * (diff * Q[j, :] - 0.01 * P[i, :])
				Q[j, :] += 0.01 * (diff * P[i, :] - 0.01 * Q[j, :])
			rmse = rmse_function(simliar_matrix.values, P, Q, sample_matrix)
			if step % 10 == 0:
				print("Iteration: %d ; Train RMSE = %.4f " % (step, rmse))
	
		pred_matrix = np.dot(P, Q.T)
		pred_df = pd.DataFrame(np.round(pred_matrix, 3), columns= simliar_matrix.columns)
		pred_df = pred_df.set_index(keys=simliar_matrix.index)
		user_predict = pred_df[pred_df.index==people].T
		user_predict = user_predict.reset_index()
		user_predict['user_id'] = people
		user_predict.columns=['place_id', 'pred_score', 'user_id']
		user_predict = user_predict.sort_values(by=['pred_score'], ascending=False)[:10]

		bulk = []
		
		for i in range(len(user_predict)):
			bulk.append(Recommend(user_id=int(user_predict.iloc[i]['user_id'], place_id=int(user_predict.iloc[i]['place_id'], category=0))))
	
	our_id = set(pd.DataFrame(list(Score.objects.all().values()))['user_id'].tolist())
	all_id = set(pd.DataFrame(list(User.objects.all().values()))['user_id'].tolist())
	sub_list = list(all_id - our_id)
	for user_number in sub_list:
		place_id_list = random.sample(list(Place.objects.filter(Q(category = 0) & Q(score_count__gte=10)).order_by('-average_score')[:30].values('place_id')),10)
		for place_number in place_id_list:
			bulk.append(Recommend(user_id=user_number,place_id=place_number ,category=0))	

	Recommend.objects.bulk_create(bulk)
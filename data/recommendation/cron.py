from .views import rmse_function, food_user_matrix, tour_user_matrix, food_main_save, tour_main_save, food_predict_score, tour_predict_score


def execute_algorithm() :
  print('crontab 실행~')

  print("메인을 실행한다")
  food_main_save()
  tour_main_save()
  
  
  print("풀코스를 시작한다.")
  food_predict_score()
  tour_predict_score()


  print("끝~~~")


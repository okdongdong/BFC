DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.mysql', #사용할 엔진
        'ENGINE': 'mysql.connector.django', #사용할 엔진
        'NAME': 'bfc_1.5', #연동할 mysql 데이터베이스 이름
        'USER': 'dunkin2', #db접속 계정명
        'PASSWORD': 'donuts',  #해당db접속 계정 비밀번호
        'HOST': 'j6e201.p.ssafy.io',   #실제 db주소
        'PORT': '6033', #포트번호
    }
}

SECRET_KEY = 'django-insecure-p$g!0p6wdbyp50tnvutq*$5(7wkep2b@pp&2c*y(xa3zfiw3!1'
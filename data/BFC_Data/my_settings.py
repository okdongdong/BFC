DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', #사용할 엔진
        'NAME': 'bfc_1.4', #연동할 mysql 데이터베이스 이름
        'USER': 'dunkin', #db접속 계정명
        'PASSWORD': 'donuts',  #해당db접속 계정 비밀번호       
        'HOST': '127.0.0.1',   #실제 db주소
        'PORT': '3306', #포트번호
    }
}

SECRET_KEY = 'django-insecure-p$g!0p6wdbyp50tnvutq*$5(7wkep2b@pp&2c*y(xa3zfiw3!1'
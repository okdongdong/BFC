from django.db import models

# Create your models here.
class Place(models.Model):
    place_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=45)
    info = models.TextField(blank=True, null=True)
    open_time = models.CharField(max_length=255, blank=True, null=True)
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=100, blank=True, null=True)
    category = models.SmallIntegerField()
    phone = models.CharField(max_length=14, blank=True, null=True)
    label = models.CharField(max_length=10, blank=True, null=True)
    station = models.CharField(max_length=25, blank=True, null=True)
    average_score = models.FloatField()
    thumbnail = models.TextField(blank=True, null=True)
    score_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'place'


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=45)
    password = models.CharField(max_length=255)
    nickname = models.CharField(unique=True, max_length=15)
    birthday = models.DateField()
    gender = models.IntegerField()
    profile_img = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class FullCourse(models.Model):
    full_course_id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=45)
    is_public = models.IntegerField()
    view = models.PositiveIntegerField()
    review = models.TextField(blank=True, null=True)
    started_on = models.DateField()
    finished_on = models.DateField()
<<<<<<< Updated upstream
    user = models.ForeignKey('User', models.DO_NOTHING)
=======
    user = models.ForeignKey(User, models.DO_NOTHING,related_name='FullCourse')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'full_course'

class Like(models.Model):
    like_id = models.AutoField(primary_key=True)
<<<<<<< Updated upstream
    user = models.ForeignKey('User', models.DO_NOTHING)
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING)
=======
    user = models.ForeignKey(User, models.DO_NOTHING,related_name='Like')
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING,related_name='Like')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'like'


class Score(models.Model):
    score_id = models.BigAutoField(primary_key=True)
    score = models.FloatField()
<<<<<<< Updated upstream
    user = models.ForeignKey('User', models.DO_NOTHING)
    place = models.ForeignKey(Place, models.DO_NOTHING)
=======
    user = models.ForeignKey(User, models.DO_NOTHING,related_name='Score')
    place = models.ForeignKey(Place, models.DO_NOTHING,related_name='Score')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'score'

class FullCourse(models.Model):
    full_course_id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=45)
    is_public = models.IntegerField()
    view = models.PositiveIntegerField()
    review = models.TextField(blank=True, null=True)
    started_on = models.DateField()
    finished_on = models.DateField()
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'full_course'

class WishFood(models.Model):
    wish_food_id = models.BigAutoField(primary_key=True)
    keyword = models.CharField(max_length=10)
<<<<<<< Updated upstream
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING)
=======
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING,related_name='WishFood')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'wish_food'


class WishPlace(models.Model):
    wish_place_id = models.BigAutoField(primary_key=True)
    keyword = models.CharField(max_length=10)
<<<<<<< Updated upstream
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING)
=======
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING,related_name='WishPlace')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'wish_place'

class Interest(models.Model):
    interest_id = models.BigAutoField(primary_key=True)
<<<<<<< Updated upstream
    user = models.ForeignKey('User', models.DO_NOTHING)
    place = models.ForeignKey('Place', models.DO_NOTHING)
=======
    user = models.ForeignKey(User, models.DO_NOTHING,related_name='Interest')
    place = models.ForeignKey(Place, models.DO_NOTHING,related_name='Interest')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'interest'

class Recommend(models.Model):
    recommend_id = models.BigAutoField(primary_key=True)
<<<<<<< Updated upstream
    user = models.ForeignKey('User', models.DO_NOTHING)
    place = models.ForeignKey(Place, models.DO_NOTHING)
=======
    user = models.ForeignKey(User, models.DO_NOTHING,related_name='Recommend')
    place = models.ForeignKey(Place, models.DO_NOTHING,related_name='Recommend')
>>>>>>> Stashed changes
    category = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'recommend'

class SurveyRecommend(models.Model):
<<<<<<< Updated upstream
    survey_recommend_id = models.BigAutoField(db_column='survey__recommend_id', primary_key=True)  # Field renamed because it contained more than one '_' in a row.
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING)
    place = models.ForeignKey(Place, models.DO_NOTHING)
=======
    survey_recommend_id = models.BigAutoField(db_column='survey__recommend_id', primary_key=True)
    full_course = models.ForeignKey(FullCourse, models.DO_NOTHING,related_name='SurveyRecommend')
    place = models.ForeignKey(Place, models.DO_NOTHING,related_name='SurveyRecommend')
>>>>>>> Stashed changes

    class Meta:
        managed = False
        db_table = 'survey_recommend'
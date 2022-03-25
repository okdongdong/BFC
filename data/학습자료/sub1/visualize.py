import itertools
from collections import Counter
from parse import load_dataframes
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import folium
from folium.plugins import MarkerCluster


def set_config():
    # 폰트, 그래프 색상 설정
    font_list = fm.findSystemFonts(fontpaths=None, fontext="ttf")
    if any(["notosanscjk" in font.lower() for font in font_list]):
        plt.rcParams["font.family"] = "Noto Sans CJK JP"
    else:
        if not any(["malgun" in font.lower() for font in font_list]):
            raise Exception(
                "Font missing, please install Noto Sans CJK or Malgun Gothic. If you're using ubuntu, try `sudo apt install fonts-noto-cjk`"
            )

        plt.rcParams["font.family"] = "Malgun Gothic"

    sns.set_palette(sns.color_palette("Spectral"))
    plt.rc("xtick", labelsize=6)


def show_store_categories_graph(dataframes, n=100):
    """
    Tutorial: 전체 음식점의 상위 `n`개 카테고리 분포를 그래프로 나타냅니다.
    """

    stores = dataframes["stores"]

    # 모든 카테고리를 1차원 리스트에 저장합니다
    categories = stores.category.apply(lambda c: c.split("|"))
    categories = itertools.chain.from_iterable(categories)

    # 카테고리가 없는 경우 / 상위 카테고리를 추출합니다
    categories = filter(lambda c: c != "", categories)
    categories_count = Counter(list(categories))
    best_categories = categories_count.most_common(n=n)
    df = pd.DataFrame(best_categories, columns=["category", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="category", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 카테고리 분포")
    plt.show()


def show_store_review_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    stores_reivews = pd.merge(
        dataframes['stores'], dataframes['reviews'], left_on='id', right_on="store"
    )
    scores_group = stores_reivews.groupby(['store', 'store_name']).count()['score']
    scores_group = scores_group.reset_index().sort_values(by='score', ascending=False).head(n=n)

    chart = sns.barplot(x='store_name', y="score", data=scores_group)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 리뷰 개수 분포")
    plt.show()


def show_store_average_ratings_graph(dataframes, n=100):
    """
    Req. 1-3-2 각 음식점의 평균 평점을 그래프로 나타냅니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )
    scores_group = stores_reviews.groupby(["store", "store_name"]).filter(lambda x : len(x) > 10)
    scores = scores_group.groupby(["store", "store_name"]).mean()['score']
    scores = scores.reset_index().sort_values(by='score', ascending=False).head(n=n)
    chart = sns.barplot(x="store_name", y="score",data=scores)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 평균 평점 ")
    plt.show()


def show_user_review_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """
    user_reviews = dataframes["reviews"].groupby('user').count()['id']
    user_reviews = user_reviews.reset_index().sort_values(by='id', ascending=False).head(n=n)
    chart = sns.distplot(user_reviews['id'], kde=False)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.xlabel("")
    plt.title("리뷰 개수 분포 ")
    plt.show()



def show_user_age_gender_distribution_graph(dataframes):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    plt.figure(figsize=(12,5))
    users = dataframes["users"]
    plt.subplot(1,2,1)
    sns.countplot(users['gender'])
    plt.title("성별 분포 ")
    plt.subplot(1,2,2)
    sns.distplot(users.loc[(users['age']<100) & (users['age']>0)]['age'], kde=False)
    plt.title("나이 분포 ")
    plt.show()


def show_stores_distribution_graph(dataframes):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    stores = dataframes["stores"].dropna(axis=0,subset=["address"])
    stores = stores[stores['address'].str.contains('서울')]
    
    stores_reviews = pd.merge(
        stores, dataframes["reviews"], left_on="id", right_on="store"
    )
    scores_group = stores_reviews.groupby(["store", "store_name"]).filter(lambda x : len(x) > 10)
    scores = scores_group.groupby(["store", "store_name"]).mean()['score']
    scores = scores.reset_index().sort_values(by='score', ascending=False)
    
    scores_all = pd.merge(
        scores.drop('store_name',axis=1), stores, left_on='store',right_on='id'
    )
    
    
    map = folium.Map(location=[37.574187, 126.976882], zoom_start=15)
    
    marker_cluster = MarkerCluster().add_to(map)
    
    for idx,item in scores_all.iterrows():
        
        folium.Marker([float(item['latitude']), float(item['longitude'])], popup = item['store_name'],
                             tooltip= round(item['score'],2)).add_to(marker_cluster)
    
    map.save('map.html')


def main():
    set_config()
    data = load_dataframes()
    # show_store_categories_graph(data)
    # 음식점 리뷰 개수 분포
    # show_store_review_distribution_graph(data)

    # 음식점 평균 점수 분포
    # show_store_average_ratings_graph(data)

    # 유저 리뷰 개수 분포
    # show_user_review_distribution_graph(data)

    # 유저 성별/나이대 분포
    # show_user_age_gender_distribution_graph(data)

    # 3-5. 각 음식점의 위치 분포를 지도에 나타냅니다.
    show_stores_distribution_graph(data)


if __name__ == "__main__":
    main()

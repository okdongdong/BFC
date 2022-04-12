

## 🏖 부산풀코스

------

- [부산풀코스](https://j6e201.p.ssafy.io/)
  - **부산풀코스는 부산의 여행지나 맛집 정보를 추천 받고 여행 플래너를 작성할 수 있는 서비스**
  - **빅데이터 기반 부산 여행지 추천 웹서비스**

![image](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/bfde3570255576796bddb2ff57ca0f62/image.png)



  ### ***📌*** 차례

------

1. [서비스 소개](#🎞-서비스-소개)
2. [주요 기술 스택](#***⚙***-주요-기술-스택)
3. [아키텍쳐](#***🔨***-아키텍쳐)
4. [ER Diagram](#***🔗***-ER-Diagram)
5. [Git Branch](#***🌿***-Git-Branch)
6. [Commit 규칙](#✔-Commit-규칙)
7. [시작하기](#✔-시작하기)
8. [팀원소개](#🍩-강알리-등킨드나쓰-팀원)





  ### 🎞 서비스 소개

------

#### 메인페이지

----

- 자신의 풀코스 소개 및 인기 풀코스 소개

  ![메인페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/a5244017663b36a454389546297e6a76/image.png)



#### 풀코스 생성 페이지 & 사전설문 페이지

----

- 풀코스 생성을 위한 사전 설문

![풀코스만들기](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/764ffcc6c65a2458069f4f2737e5e0c6/풀코스만들기.gif)





#### 여행지 추천 페이지

----

- 사용자 좋아요를 기반한 유사 관광지

  - SVD알고리즘 성분분석을 통해 좋아요를 기반으로 유사 관광지를 찾아서 추천

  ![여행지 추천페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201//uploads/74db7c29d7a3a93eff9337136e535d35/image.png)



#### 거리 기반 추천 페이지

----

- Elastic Search Geo_Distance_Query를 이용한 거리 기반 추천 페이지

  ![거리순추천&장소디테일페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/e656e9f6f091756cc4d00b1784b6568f/image.png)



#### 사전설문 추천 페이지

----

- 사전 설문을 바탕으로 추천

  - 관광지 : 테마 키워드를 사용하여 관광지별 유사도 측정하여 추천
  - 음식점 : SVD 알고리즘으로 상관계수를 구한 후 유의미한 리뷰를 바탕으로 추천

  ![사전설문추천페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/696b26398b32b8d8033ce8698b8c2a60/image.png)



#### 평점 추천 페이지

----

- 리뷰 평점을 바탕으로 추천

  - 사용자의 리뷰를 바탕으로 예측 행렬을 생성하여 예상 평점을 매긴 후 SGD방식으로 오차를 줄이며 추천

  ![평점추천페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/918aaf5000307140255d7ae98ceaa350/image.png)



#### 풀코스 디테일 페이지

----

- 풀코스 페이지를 상세하게 확인

  ![풀코스디테일](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/223677f108c630a9d5b5ed109853bb4b/풀코스디테일.gif)



#### 프로필 페이지

----

- 자신의 관심장소 확인 및 풀코스 확인

  ![프로필페이지](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/3d34543049305c3b5b6d9ccd55a78f71/ezgif.com-gif-maker__1_.gif)




  ### ***⚙*** 주요 기술 스택

------

  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=ffffff" /><img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=ffffff" /><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=ffffff"/><img src="https://img.shields.io/badge/redux-764ABC?style=flat-square&logo=react&logoColor=ffffff"/><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=ffffff"/><img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=Django&logoColor=ffffff" /><img src="https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=Jupyter&logoColor=ffffff" />



**[Backend]**

- **SpringBoot** (2.6.4) : Restful API 구현
- **JPA** : ORM 기술을 활용하여 객체 지향적이고 생산성이 높은 개발을 추구함
- **QueryDSL** (5.0.0) : 컴파일 타임에 에러를 잡고 동적 쿼리를 사용하기 위해 사용
- **MySQL** (8.0.28) : RDBMS로 서비스에 필요한 데이터들을 저장
- **Redis** (3.0.504) : 비회원이 조회하는 인기 맛집 및 여행지(이하 장소) 데이터처럼 자주 접근하는 쿼리를 캐싱하여 효율성을 높이고 리프레시 토큰에 TTL을 적용하여 보다 나은 보안성을 추구함.
- **Elasticsearch** (7.10.1) : 장소 검색을 위한 검색 엔진으로 사용하고 geo_distance 쿼리를 이용하여 근처에 위치한 장소를 검색하기 위해 사용
- **Docker** (20.10.13) : 각 프로젝트를 컨테이너로 관리하여 빌드-배포
- **Jenkins** (:lts) : pipeline을 이용한 빌드 및 배포 자동화 

  

**[Frontend]**

- **React** (17.0.2) : SPA구현
- **Redux** (4.1.2) : 글로벌 변수관리과 상태관리를 위해 리덕스 사용
- **TypeScript** (4.6.2) :  변수의 타입을 명확히 하여 버그를 사전에 방지하기 위해 사용  

  

**[DataAnalysis]**

- **Django**(3.2.12) : 추천시스템을 구성하기 위한 Backend
- **BeautifulSoup** : 리뷰 데이터 및 장소 데이터 크롤링하기 위해 사용
- **Crontab** : 특정 시간 (새벽 3시)마다 주기적으로 학습을 시켜주기 위함
- **Pandas** : 데이터 전처리



**[정적분석(Sonarqube)]**

- Before

  ![before](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/09c94ccfd711a43a48e1d9ab5b59a4e1/image.png)

- After

  ![after](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/842b6f6411b797bcbf8b7ea2fe3c92ca/image.png) 





  ### ***🔨*** 아키텍쳐

------

![image](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/83e5df4137bb7152a50fd2e9bf4267da/image.png)





  ### ***🔗*** ER Diagram

------



![image](https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22E201/uploads/663bc8f72ba875373f44e8fe54e79965/image.png)





### ***🌿*** Git Branch

---

> ✨ (master) → (release) → (develop) → (backend / frontend) → (feature/<BE / FE>/<feature>)

- `master` : release branch

- `release` : jenkins build

- `develop` : 단위기능 개발

- `backend` : backend branch

- `frontend` : frontend branch

- `feature/<BE/FE>/<feature>` : 개별 개발 branch 



### ✔ Commit 규칙

---

> ✨ 형태 : git commit -m '#[지라이슈번호] [git 컨벤션]: [작업내용]'
>
>
>   예시 ) `git commit -m '#[지라이슈번호] feat 페이지네이션 기능 추가'`

- git commit -m '#[지라이슈번호] style 버튼 스타일링'

- git commit -m '#[지라이슈번호] fix 팝업 버그 수정'

- git commit -m '#[지라이슈번호] docs 리드미 수정'

  

> **Git 컨벤션**

- feat : 새로운 기능
- fix : 버그 수정
- docs : 문서 (문서 추가, 수정, 삭제)
- style : 포맷팅, 세미콜론 추가, etc) 코드 변화 없을 때
- refactor : 코드 리팩토링
- test : 테스트 추가, 테스트 리팩토링
- chore: 빌드 업무 수정, 패키지 매니지 수정



> **Transition 사용하기**

- [“Resolves” “Fixes” “Closes”] + [지라이슈번호]

- MR Description에 [“Resolves” “Fixes” “Closes”] + 이슈 아이디가 있으면 이슈가 자동으로 닫힘. (Commit Message에서도 가능하지만 혼란을 방지하기 위해 사용하지 않기로 함)



### ✔ 시작하기

----

#### 시작하기

----

- DB
  - MySQL
    - PORT : 3306
  - Redis
    - PORT : 6379
  - Elastic Search
    - PORT : 9200
- Backend
  - Spring 2.6.4 (Gradle)
  - Django 3.2.12
  - Sonarqube
    - PORT : 9000
- Frontend
  - node 17.0.2

```shell
# /backend/
$ gradlew clean build
$ build/libs/bfc-0.0.1-SNAPSHOT.jar -jar app.jar

# /data/
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver

# /frontend/
$ npm install
$ npm start
```



#### 배포하기

----

- Deploy with Docker (exec 참조)

  ```shell
  $ git clone [project]
  
  # /backend/
  $ graldew clean build -x test
  
  # /
  $ docker-compose up -d --build
  ```



#### Crontab

---

```shell
$ docker exec -it data /bin/bash
# in data container bash

$ get-apt update
$ get-apt install cron
$ service cron start
$ python manage.py crontab add
```









  ### 🍩 강알리 등킨드나쓰 팀원

------

  - **김도훈** \- *PM, data analysis -* [DoZZang](https://github.com/DHKim95)
    - [tbvjdkrak2@gmail.com](mailto:tbvjdkrak2@gmail.com)
  - **강동옥** \- *frontend -* [PrincessOk](https://github.com/okdongdong)
    - [kjch6411@gmail.com](mailto:kjch6411@gmail.com)
  - **김태현** \- *data analysis -* [xogxog](https://github.com/xogxog)
    - [nasa0939@gmail.com](mailto:nasa0939@gmail.com)
  - **양지훈** \- *backend -*  [KkoBug](https://github.com/kkobug)
    - [kelvin9149@gmail.com](mailto:kelvin9149@gmail.com)
  - **전호정** \- *frontend -* [hoho](https://github.com/hojeong33)
    - [jhj20071@gmail.com](mailto:jhj20071@gmail.com)
  - **정성우** \- *backend -* [Poongdeong](https://github.com/jsw3788)
    - [jsw3788@naver.com](mailto:jsw3788@naver.com)

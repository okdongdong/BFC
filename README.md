# README

## 👨‍👦‍👦크루원 소개👨‍👧‍👧

### 우리 무슨 팀

👸 강동옥 - *frontend -* [PrincessOk](https://github.com/okdongdong)

⚽ 김도훈 - *PM, data analysis -* [DoZZang](https://github.com/DHKim95)

🎵 김태현 - *data analysis -* [xogxog](https://github.com/xogxog)

🐢 양지훈 - *backend -*  [KkoBug](https://github.com/kkobug)

🧘‍♀️ 전호정 - *frontend -* [hoho](https://github.com/hojeong33)

🧙‍♂️ 정성우 - *backend -* [SpringLeader](https://github.com/jsw3788)



---

### Git Branch

**✨ (master) → (release) → (develop) → (backend / frontend) → (feature/<BE/FE>/<feature>)**

- `master` : release branch

- `release` : jenkins build

- `develop` : 단위기능 개발

- `backend` : backend branch

- `frontend` : frontend branch

- `feature/<BE/FE>/<feature>` : 개별 개발 branch 

​		예시) `feature/FE/login`



### Commit 규칙

✨ **형태 : git commit -m '#[지라이슈번호] [git 컨벤션]: [작업내용]'**

예시 )

```
git commit -m '#[지라이슈번호] feat
페이지네이션 기능 추가'

git commit -m '#[지라이슈번호] style
버튼 스타일링'

git commit -m '#[지라이슈번호] fix
팝업 버그 수정'

git commit -m '#[지라이슈번호] docs
리드미 수정'
```



**Git 컨벤션**

- feat : 새로운 기능
- fix : 버그 수정
- docs : 문서 (문서 추가, 수정, 삭제)
- style : 포맷팅, 세미콜론 추가, etc) 코드 변화 없을 때
- refactor : 코드 리팩토링
- test : 테스트 추가, 테스트 리팩토링
- chore: 빌드 업무 수정, 패키지 매니지 수정



**Transition 사용하기**

- [“Resolves” “Fixes” “Closes”] + [지라이슈번호]

 	→ Commit Message 혹은 MR Description에 [“Resolves” “Fixes” “Closes”] + 이슈 아이디가 있으면 이슈가 자동으로 닫힘. 





### 🛠주요기술스택

**Backend**

- SpringBoot
- JPA
- MySQL
- Redis
- ElasticSearch
- Django

**Frontend**

- React
- Node.js,
- VisualStudioCode

**DataAnalysis**

- BeautifulSoup
- crontab
- Numpy
- Pandas

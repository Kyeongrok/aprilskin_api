# Aprilskin 주문 조회 API
Aprilskin cafe24 주문 정보를 만들어준다.

## 접속 방법
```
http://ec2-13-59-102-169.us-east-2.compute.amazonaws.com/index.html
http://localhost:9000/cafe24/list?start_datetime=2017-07-17+01:40:00&end_datetime=2017-07-17+02:40:00
```
위 주소로 접속 한다.

### 사용법

#### 기본 주문 데이터 조회
```
http://localhost:9000/cafe24/originlist?start_datetime=2017-07-28+18:00:01&end_datetime=2017-07-28+24:00:00
```
#### 삽입(insert)
```
http://localhost:9000/cafe24/product/insert?code=P00000TY&item_code=000A&quentity=1
```

#### 지우기(delete)
```
http://localhost:9000/cafe24/product/delete?id=9
```

### 배포하는 방법
```
cd /var/www/electron_react
git pull
npm run build
rsync -ar /var/www/electron_react/build/ /var/www/html
```

### 재시작 방법
```
/var/www/electron_react
forever list
forever start --minUptime 1000 --spinSleepTime 1000 ./bin/www
```

### 표준시 서울로 바꾸기
```
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
reboot
```


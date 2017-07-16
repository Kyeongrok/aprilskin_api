# Aprilskin 주문 조회 API
Aprilskin cafe24 주문 정보를 만들어준다.

## 접속 방법
```
http://ec2-13-59-102-169.us-east-2.compute.amazonaws.com/index.html
```
위 주소로 접속 한다.

### 사용법
```
http://localhost:9000/cafe24/list?start_datetime=2017-07-17+01:40:00&end_datetime=2017-07-17+02:40:00
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
forever start server
```

### 표준시 서울로 바꾸기
```
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
reboot
```


## JavaScript sample code for Yating Automatic Speech Recognition (ASR) service

## Environment
* Node.js >= 16


## Running Demo

### Install backend
```
cd ./backend
npm i
npm run build
```

### Install frontend
```
cd frontend
npm i
```

### Run
* 用來取得token的backend: 會跑在local port 3010, 在`API_KEY`中填入ASR api key
```
cd ./backend
API_KEY="YOUR_API_KEY" npm start
```
* frontend: 會跑在local port 3011, 開啟網頁說話就可以看到ASR結果
```
cd ./frontend
npm run dev
```

### Custom LM
* 參考文件[建置Custom LM](https://developer.yating.tw/doc/asr-%E8%AA%9E%E9%9F%B3%E8%BD%89%E6%96%87%E5%AD%97-%E5%AE%A2%E8%A3%BD%E5%8C%96%E6%A8%A1%E5%9E%8B)
* 將結果內的`path`放入前端網址
  * ex: http://localhost:3011/?s3CusModelKey=production/e2e//999999.zip
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
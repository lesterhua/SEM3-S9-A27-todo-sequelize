# Todo-List by sequelize

使用 Node.js + Express + MySQL 打造的todo list網站，可以新增、刪除、修改，打造使用者認證系統，可以用 fb 登入，提供兩個篩選器:A-Z 和 Z-A

## Features - 產品功能

- 使用者看到所有的todo清單
- 使用者可以用在首頁可以根據篩選器按字母大到小，或小到大排列
- 使用者可以新增一筆todo
- 使用者可以修改一筆todo
- 使用者可以刪除一筆todo
- 使用者可以完成一筆todo
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼
- 使用者註冊、登入時，有錯誤，會顯示告知使用者其中的錯誤訊息
- 使用者的密碼要使用 bcrypt 加密處理
- 使用者也可以透過 Facebook Login 直接登入

## Environment SetUp - 環境建置

- node.js v10.16.0
- express 4.17.1
- express-handlebars 3.1.0
- bcryptjs 2.4.3
- body-parser 1.19.0
- connect-flash 0.1.1
- dotenv 8.0.0
- express-session 1.16.2
- method-override 3.0.0
- passport 0.4.0
- passport-facebook 3.0.0
- passport-local 1.0.0
- nodemon 1.19.1
- sequelize 5.16.0
- sequelize-cli 5.5.0
- mysql2 1.6.5

## 軟體

- Visual Studio Code
- Git
- MySQL
- MySQL Workbench

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
 https://github.com/lesterhua/SEM3-S9-A27-todo-sequelize.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd SEM3-S9-A27-todo-sequelize
```

3. 安裝 npm 安裝相關套件

```
在 Terminal 輸入 npm install 指令
```

4. 透過 Visual Studio Code 開啟專案

```
code .
```

5. 在根目錄下新增.env 檔案串接您的 facebook 登入資訊

```
FACEBOOK_ID=XXXXXXXX
FACEBOOK_SECRET=XXXXXXXX
FACEBOOK_CALLBACK=http://example.com/auth/facebook/callback
```

6. 修改資料庫 config 檔(./config/config.json)

```
在 development 中的 password
```

7. 資料庫設定與測試資料準備
- 請在 MySQL Workbench 輸入下方指令
```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```

8. 建立 Users 和 Todos Table
- 請在 terminal 輸入下方指令
```
npx sequelize db:migrate
```

9. 新增user和todo資料，並查詢資料庫是否己記錄
- 請在 MySQL Workbench 輸入下方指令
```
select * from todos;
select * from users;
```

10. 執行專案

```
在 Terminal 輸入 npm run dev  指令
```

#### 安裝成功後，會在終端機看到訊息"Express is running on :http://localhost:3000

## 畫面 - Demo

![alt text](https://github.com/lesterhua/SEM3-S9-A27-todo-sequelize/blob/master/picturs/register.gif?raw=true)

![alt text](https://github.com/lesterhua/SEM3-S9-A27-todo-sequelize/blob/master/picturs/login%20&%20sort.gif?raw=true)

![alt text](https://github.com/lesterhua/SEM3-S9-A27-todo-sequelize/blob/master/picturs/facebook.gif?raw=true)

![alt text](https://github.com/lesterhua/SEM3-S9-A27-todo-sequelize/blob/master/picturs/CRUD.gif?raw=true)


## 作者 - Authors

[Lester](https://github.com/lesterhua)

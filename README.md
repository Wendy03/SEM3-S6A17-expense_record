# 記帳本

#### 使用者登入帳號可以記錄每日的支出，可以新增、修改、刪除資料，可以月份、類別查詢資料

## Installing

#### 環境

1.  node.js v-10.15.0

2.  專案套件
    > - bcryptj: ^2.4.3
    > - body-parser: ^1.19.0
    > - connect-flash: ^0.1.1
    > - dotenv: ^8.2.0
    > - express: ^4.17.1
    > - express-handlebars: ^3.1.0
    > - express-session: ^1.17.0
    > - express-validator: ^6.2.0
    > - method-override: ^3.0.0
    > - mongoose: ^5.7.12
    > - passport: ^0.4.0
    > - passport-facebook: ^3.0.0"
    > - passport-github: ^1.1.0
    > - passport-local: ^1.0.0

#### 確認本機是否安裝 [Mongodb](https://www.mongodb.com/download-center/community) 、 [Robo 3T](https://robomongo.org/)

#### 開啟終端機到存放專案本機位置並執行:

> git clone https://github.com/Wendy03/SEM3-S6A17-expense_record.git

#### 初始

```

1.使用終端機切換目錄到專案: cd SEM3-S6A17-expense_record
2.使用終端機安裝套件: npm install
3.開啟 Robo 3T，並在 localhost 上面按右鍵 Create Database，建立一個新的資料庫 record
4.使用終端機 npm run seeder 來導入種子資料

```

#### 專案的「根目錄」新增 .env 這個檔案

> #### [Facebook developers](https://developers.facebook.com/) 創建應用程式取得 client ID ' client secret

```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback
```

#### 執行程式

```

1. 終端機輸入: nodemon run dev
2. 開啟網頁輸入: http://localhost:3000/users/login

```

## 主要功能

##### 1. 使用者填寫名子、Email、Password 註冊帳號

##### 2. 使用者註冊成功後以 Email、Password 登入記帳本

##### 3. 使用者在首頁一次瀏覽所有支出的清單

##### 4. 使用者在首頁看到所有支出清單的總金額

##### 5. 使用者新增一筆支出

##### 6. 使用者編輯支出的所有屬性

##### 7. 使用者刪除任何一筆支出

##### 8.使用者在首頁可以根據支出「月份」、「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 測試帳號

| Name  | Email             | Password |
| ----- | ----------------- | -------- |
| user1 | user1@example.com | 12345678 |
| user2 | user2@example.com | 12345678 |

## 截圖

###### 1.登入

![image](https://github.com/Wendy03/SEM3-S6A17-expense_record/blob/master/public/img/loginpage.PNG)

###### 2.註冊

![image](https://github.com/Wendy03/SEM3-S6A17-expense_record/blob/master/public/img/signuppage.PNG)

###### 3.個人頁面

![image](https://github.com/Wendy03/SEM3-S6A17-expense_record/blob/master/public/img/userpage.PNG)

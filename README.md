# tw-stock-telegram-bot
台股機器人，快速取得個股及大盤即時走勢、近期 K 線、相關新聞、盤後資料等，讓你在各種不方便打開充滿高對比紅綠黑看盤軟體的場合 (如擁擠的捷運上或辦公室而且老闆坐你後面) 也能掌握即時報價資訊。
![](https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/7de5bf604e5f01d76febe5f668088c2a4518ff1c/tstb-1.png)

## Demo
`@tw_stock_telegram_bot`  
https://t.me/tw_stock_telegram_bot  
(學術研究開發測試使用，不提供 24/7 不中斷服務，亦不保證資料之正確性)

## 如何使用
### 前置作業
請先找到 `@BotFather` [建立新的 Bot](https://core.telegram.org/bots#6-botfather) 取得 API token，並啟用 [inline mode](https://core.telegram.org/bots/inline) 以及設定 commands (`/setcommands`)
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/7de5bf604e5f01d76febe5f668088c2a4518ff1c/tstb-2.png" width="250" />

### 執行
#### 1.
```
git clone https://github.com/x3388638/tw-stock-telegram-bot.git
cd tw-stock-telegram-bot
cp config.js.example config.js
# 將 Bot API token 填入 config.js 中 `botToken`
```

#### 2.
```
npm run build
npm start
```
或
```
npm install
npm run dev:watch
```

### Heroku
https://devcenter.heroku.com/articles/container-registry-and-runtime#getting-started

#### Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
Download and install the Heroku CLI.  
  
If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

#### Log in to Container Registry
You must have Docker set up locally to continue. You should see output when you run this command.

```
$ docker ps
```
Now you can sign into Container Registry.

```
$ heroku container:login
```
#### Push your Docker-based app
Build the Dockerfile in the current directory and push the Docker image.

```
$ heroku container:push web
```
#### Deploy the changes
Release the newly pushed images to deploy your app.

```
$ heroku container:release web
```

## 功能
### `/start` 導覽訊息
<details>
 <img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-3.jpg" width="350" />
</details>

### `/chart` 盤中走勢圖
<details>
<p><code>/chart ${stockId}</code> 查詢個股</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-4.jpg" width="350" />

<p><code>/chart_tse</code> 查詢上市指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-5.jpg" width="350" />

<p><code>/chart_toc</code> 查詢櫃買指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-6.jpg" width="350" />
</details>

### `/text` 盤中文字報價及五檔
<details>
<p><code>/text ${stockId}</code> 查詢個股</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-7.jpg" width="350" />

<p><code>/text_tse</code> 查詢上市指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-8.jpg" width="350" />

<p><code>/text_otc</code> 查詢櫃買指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/1bcfd58e76649350744ea1b6b32e78a470b239d2/tstb-9.jpg" width="350" />
</details>

### `/k` 近期 K 線圖
<details>
<p><code>/k ${stockId}</code> 查詢個股</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-10.jpg" width="350" />

<p><code>/k_tse</code> 查詢上市指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-11.jpg" width="350" />

<p><code>/k_otc</code> 查詢櫃買指數</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-12.jpg" width="350" />
</details>

### `/news` 個股新聞
<details>
 <img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-13.jpg" width="350" />
</details>

### `/after_hours` 盤後資料
<details>
<p><code>/after_hours ${stockId}</code> 查詢個股盤後資料</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/b708a1b02ff439069b76837876b9d7ccce499ee5/tstb-19.jpg" width="350" />

<p><code>/after_hours</code> 查詢其他盤後資料</p>
<img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-14.jpg" width="350" />
</details>

### Inline mode
<details>
<p><img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-15.jpg" width="350" /></p>
<p><img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-16.jpg" width="350" /></p>
<p><img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-17.jpg" width="350" /></p>
<p><img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/113f34ff1732b8ee8e438d573cd06db185cc3b1f/tstb-18.jpg" width="350" /></p>
</details>

## 已知問題
- [ ] 盤後資料的外資買賣超、投信買賣超會失敗
- [ ] K 線圖資料缺漏 (原始資料問題)
- [ ] 開盤前試撮資料顯示問題

## LICENSE
MIT

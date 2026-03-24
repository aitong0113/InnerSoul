# 心途 Inner Soul

<div align="center">
  <img src="./demo.gif" alt="Inner Soul Demo" width="100%">
</div>
<br>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-71A29D?style=for-the-badge)](https://aitong0113.github.io/InnerSoul/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aitong0113/InnerSoul)

<div align="center">
  <h3>音樂陪伴 × 療癒 × 自我對話的心靈平台</h3>
</div>

「心途 Inner Soul 」源自一個最簡單、也是最被忽略的需求——
每個人心裡，都需要一個能被理解、被陪伴、被接住的地方。

在快速流動、資訊爆炸的生活裡，人們越來越習慣壓抑、消化、假裝沒事。
然而，真正的療癒不是靠外界的聲音，而是重新聽見 內在那條微弱但真實的心之途徑。

心途 Inner Soul 的誕生，是希望讓每一個人，都能在生活中的某一刻停下來，
透過語音、圖像、日記，把注意力放回自己身上，重新與內心對話。

---

## 技術棧

- React 18
- Redux Toolkit
- React Router
- Axios
- Node.js (Mock API)
- JSON Server
- SCSS
- Vite
- ESLint

---

## 系統架構

```
Frontend (React + Redux)
				↓
Mock API (Node.js mock server)
				↓
JSON DB (db.json)
```

此架構模擬真實前後端分離（SPA + RESTful API）開發模式，
前端僅透過 API 存取資料，未直接讀寫資料庫。

---

## 資料流說明

1. 使用者於前端（React）操作（如登入、寫日記、收藏音樂）
2. 觸發元件事件，dispatch Redux action
3. Redux middleware（如 thunk）處理非同步，呼叫 API（axios）
4. API 請求送至 mock server，讀寫 JSON DB
5. API 回傳資料，Redux 更新 global state
6. React 元件自動 re-render，UI 同步最新狀態
7. API error 統一由 thunk 捕捉，並透過 Redux state 回傳錯誤狀態給 UI 顯示提示。

### Global State（全域狀態）

- 會員登入狀態、會員資料
- 播放器狀態（目前播放歌曲、播放清單、是否播放中）
- 收藏歌曲、追蹤清單
- 訂閱方案狀態

### Local State（區域狀態）

- 表單輸入、modal 開關、頁面分頁等

### 資料取得方式

- 會員、日記、播放清單、歌曲、收藏、追蹤、訂閱方案等皆透過 axios 向 mock API 取得
- Redux slice 統一管理跨元件資料，確保狀態一致與可追蹤

---

## 技術選型理由

- **為什麼使用 Redux？**
  - 專案有多個跨頁、跨元件的資料需求（如會員、播放、收藏、訂閱），Context 難以管理複雜邏輯。
  - Redux Toolkit 提供明確資料流、可預測狀態變化，利於多人協作與維護。
  - 易於整合 devtools，方便追蹤狀態與除錯。

- **為什麼用 mock server？**
  - 前後端可獨立開發，API 介面可提前設計與驗證。
  - 模擬真實 RESTful API，方便測試資料流與錯誤處理。
  - 未來可無痛切換正式後端。

- **為什麼資料設計用關聯表？**
  - 收藏（songLikes）、追蹤（playlistFollowers）等多對多關係，需用關聯表維護。
  - 關聯表設計可支援複雜查詢與彈性擴充，貼近實際後端資料庫設計。

---

## 團隊分工

本專案由五人團隊協作完成：

- **Abbie**
  - 主題理念發想與產品定位，確立專案視覺風格與使用者體驗。
  - 開發 Header、Footer、註冊/登入等全站共用元件，並主導前端架構規劃。
  - 撰寫專案文件、協調團隊溝通，負責需求拆解、進度追蹤與協作流程優化。

- **CK**
  - 音樂播放區全功能開發（播放、暫停、切歌、播放清單、收藏等），串接音樂資源與 UI 動畫。
  - 撰寫並優化 Redux 狀態管理邏輯，確保播放狀態與全站同步。
  - 設計並維護與音樂、播放紀錄相關的資料結構與 mock DB。

- **孟**
  - 會員中心頁面開發，包含會員資料檢視、編輯、密碼變更等功能。
  - 實作會員相關 API 串接，處理會員資料驗證與安全性。
  - 協助測試與除錯會員模組，優化使用者體驗。

- **MuMu**
  - 訂閱功能全流程開發（訂閱方案選擇、付款模擬、狀態顯示等）。
  - 負責全站 RWD 響應式設計，確保各裝置皆有良好瀏覽體驗。
  - 協助 UI 細節調整與跨瀏覽器相容性測試。

- **蜜桃果茶**
  - 心情日記功能開發（新增、瀏覽、刪除、語音/圖像/情緒貼圖上傳等）。
  - 串接日記資料庫，設計日記資料結構與 API。
  - 優化日記頁面互動體驗，協助情緒貼圖與語音功能整合。

---

## 主要功能

### 1. 會員與認證

- 註冊、登入、登出、會員資料編輯
- 會員狀態全域同步

### 2. 心情日記

- 新增、瀏覽、刪除日記
- 支援語音、圖像、情緒貼圖

### 3. 音樂播放

- 播放、暫停、切換音樂
- 支援播放清單、收藏

### 4. FAQ 與陪伴內容

- 常見問題互動
- 陪伴語錄、情緒建議

### 5. 訂閱與付款

- 方案訂閱、付款流程模擬

---

## 檔案結構

```
InnerSoul/
├── public/           # 靜態資源
├── mock/             # Node.js mock server
├── src/
│   ├── assets/       # 圖片、音樂、SCSS
│   ├── components/   # 共用元件、功能模組
│   ├── pages/        # 各頁面
│   ├── services/     # API 與資料服務
│   ├── slices/       # Redux 狀態切片
│   └── store.js      # Redux store 設定
├── package.json
└── ...
```

---

## 安裝與啟動

1. Clone 專案
   ```bash
   git clone <本專案網址>
   cd InnerSoul
   ```
2. 安裝前端依賴
   ```bash
   npm install
   ```
3. 啟動 mock server（另開一 terminal）
   ```bash
   cd mock
   npm install
   npm run start
   ```
4. 啟動前端
   ```bash
   cd ..
   npm run dev
   ```
5. 開啟 http://localhost:5173

---

## 資料結構

### User（會員）

| 欄位     | 型別   | 說明           |
| -------- | ------ | -------------- |
| id       | number | 會員唯一識別碼 |
| email    | string | 信箱           |
| password | string | 密碼（加密）   |
| userName | string | 暱稱           |
| userImg  | string | 頭像檔名       |
| plan     | string | free/pro       |

#### 範例

```json
{
  "id": 1,
  "email": "abc@gmail.com",
  "password": "$2a$10$...",
  "userName": "小熊忘記密碼了",
  "userImg": "avatar-rabbit.png",
  "plan": "free"
}
```

### Diary（日記）

| 欄位         | 型別   | 說明                                     |
| ------------ | ------ | ---------------------------------------- |
| id           | number | 日記唯一識別碼                           |
| userId       | number | 所屬會員 id                              |
| diaryDate    | string | 日記日期（YYYY-MM-DD）                   |
| diaryTitle   | string | 標題                                     |
| diaryContent | string | 內容                                     |
| mood         | string | 心情（happy/good/notgood/mad/messy/sad） |
| diaryImg     | string | 圖片網址                                 |
| createdAt    | string | 建立時間（ISO）                          |
| updatedAt    | string | 更新時間（ISO）                          |

#### 範例

```json
{
  "id": 1,
  "userId": 3,
  "diaryDate": "2025-12-19",
  "diaryTitle": "終於星期五了！！",
  "diaryContent": "好開心 \n好開心",
  "mood": "happy",
  "diaryImg": "https://.../img.png",
  "createdAt": "2026-12-19T10:58:35.465Z",
  "updatedAt": "2026-12-19T10:58:35.465Z"
}
```

### Playlist（播放清單）

| 欄位            | 型別     | 說明             |
| --------------- | -------- | ---------------- |
| id              | number   | 清單唯一識別碼   |
| listName        | string   | 清單名稱         |
| category        | string   | 分類             |
| songsID         | number[] | 歌曲 id 陣列     |
| ownerId         | number   | 擁有者 id        |
| listDescription | string   | 清單描述（可選） |

#### 範例

```json
{
  "id": 1,
  "listName": "孤獨",
  "category": "心情推薦",
  "songsID": [1, 6, 8, 14],
  "ownerId": 2
}
```

### Song（歌曲）

| 欄位     | 型別   | 說明           |
| -------- | ------ | -------------- |
| id       | number | 歌曲唯一識別碼 |
| name     | string | 歌名           |
| author   | string | 作者           |
| category | string | 歌曲分類       |
| fileName | string | 檔名           |
| fileUrl  | string | 音檔路徑       |

#### 範例

```json
{
  "id": 1,
  "name": "靜靜聽著雨落",
  "author": "raindrops",
  "category": "平靜",
  "fileName": "calm-heavenly-raindrops",
  "fileUrl": "music/m02.mp3"
}
```

### songLikes（歌曲收藏關聯）

| 欄位   | 型別   | 說明           |
| ------ | ------ | -------------- |
| id     | number | 關聯唯一識別碼 |
| userId | number | 會員 id        |
| songId | number | 歌曲 id        |

### playlistFollowers（清單追蹤關聯）

| 欄位       | 型別   | 說明           |
| ---------- | ------ | -------------- |
| id         | number | 關聯唯一識別碼 |
| userId     | number | 會員 id        |
| playlistId | number | 清單 id        |

### plans（訂閱方案）

| 欄位          | 型別   | 說明                          |
| ------------- | ------ | ----------------------------- |
| id            | string | 方案 id（plan_free/plan_pro） |
| title         | string | 方案名稱                      |
| price         | number | 價格                          |
| uiFeatures    | array  | 前端顯示功能                  |
| logicFeatures | object | 方案邏輯限制                  |

#### 範例

```json
{
  "id": "plan_free",
  "title": "輕量體驗",
  "price": 0,
  "uiFeatures": [{ "text": "語音內容庫：僅瀏覽目錄，可試聽免費音檔", "included": true }],
  "logicFeatures": { "diaryLimit": 3, "canAccessFullAudio": false }
}
```

---

## 專案未來展望 / Roadmap

- 串接正式後端 API，導入 JWT/OAuth 安全驗證
- 日記功能支援 AI 心情分析與自動標籤
- 音樂播放支援個人化推薦與自動生成播放清單
- 推出 APP 版（React Native）
- 多語系支援（i18n）
- 會員社群互動（留言、按讚、分享）
- 更完整的自動化測試與 CI/CD 部署流程
- 優化無障礙設計（a11y）

---

## 注意事項

- 本專案為展示用途，請勿填寫真實個人資料
- 資料僅供測試，不會實際儲存或處理

---

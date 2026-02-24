# Copilot Instructions for Inner Soul

## 專案架構與資料流
- 前端採用 React 18 + Redux Toolkit，並以 SPA 方式運作。
- 所有資料存取皆透過 RESTful API，無直接操作資料庫。
- Mock API 由 Node.js + JSON Server 提供，資料來源為 mock/db.json。
- Redux middleware（如 thunk）負責處理非同步資料流與 API 呼叫。

## 主要目錄與檔案
- `src/components/`：UI 組件，分為 auth、common、features、layout、payment、shared 等子目錄。
- `src/pages/`：頁面組件，依功能分層（如 diary、faq、home、Member、playlist、subscription）。
- `src/services/`：API 與資料存取服務，分 admin、auth、mood、member 等。
- `src/slices/`：Redux slice，管理狀態與 reducer。
- `mock/`：Node.js mock server 與資料庫。

## 開發流程與指令
- 啟動前端：`npm run dev`（Vite）
- 啟動 mock API：進入 mock 目錄，執行 `node server.js` 或 `npm start`
- 編譯與格式檢查：`npm run lint`（ESLint）、`npm run format`（Prettier）

## 專案慣例
- 組件命名採 PascalCase，檔案命名與資料夾結構依功能分層。
- SCSS 依頁面與組件分層，並有全域變數檔（assets/_variables.scss, _variables-dark.scss）。
- Redux action 與 slice 皆集中於 src/slices/，避免跨檔案重複。
- API service 皆集中於 src/services/，統一 axios 呼叫與錯誤處理。

## 重要溝通模式
- 前端與 mock API 以 axios 進行資料交換，所有資料流皆經由 Redux middleware。
- 跨組件資料流以 Redux store 為主，避免 props drilling。

## 外部依賴
- React Router 用於頁面切換。
- Axios 用於 API 呼叫。
- SCSS 用於樣式管理。
- Vite 作為開發與建構工具。

## 範例：資料流
1. 使用者操作（如登入、寫日記、收藏音樂）
2. 觸發元件事件，dispatch Redux action
3. Redux middleware 處理非同步，呼叫 API（axios）
4. API 回傳資料，更新 Redux store
5. 組件自動 re-render

## 參考檔案
- `README.md`：專案簡介與技術架構
- `mock/server.js`：Mock API server 實作
- `src/services/api.js`：API 呼叫範例
- `src/slices/`：Redux 狀態管理

---

請根據上述慣例與架構協助撰寫、重構、除錯，並優先遵循現有資料流與分層設計。若有不明確處，請主動詢問或參考相關檔案。
// 引入必要的套件
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path"); // Node.js 內建，用來處理檔案路徑
const fs = require("fs"); // Node.js 內建，用來讀取與寫入檔案

const server = jsonServer.create();
const middlewares = jsonServer.defaults(); // 包含 Logger, Static, CORS 等功能

// --- [核心設定：資料庫路徑] ---
const dbPath = path.join(__dirname, "db.json");

// --- [核心設定：自動初始化] ---
if (!fs.existsSync(dbPath)) {
  const initialData = {
    users: [],
    diaries: [],
    lists: [],
    songs: [],
    songLikes: [],
    playlistFollowers: [],
    plans: [],
  };
  // 將結構轉為 JSON 字串並寫入檔案，格式化縮進為 2 格
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

// --- [核心設定：路由與權限] ---
// 1. 初始化資料庫路由
const router = jsonServer.router(dbPath);

// 2. 將資料庫實例綁定到 server 上，這是 json-server-auth 的要求
server.db = router.db;

// 3. 使用預設中間件 (一定要在最前面)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 4. 使用 json-server-auth 權限驗證 (一定要在 router 之前)
server.use(auth);

// 健康檢查
server.get("/", (req, res) => {
  res.json({ status: "ok", message: "Service is running!" });
});

server.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// 5. 最後才掛載正式的資料路由
server.use(router);

// --- [啟動伺服器] ---
// 優先讀取給予的 Port，若無則預設 3001 (本地開發用)
const port = process.env.PORT || 3001;

// 關鍵點：一定要監聽 '0.0.0.0'，這代表接受來自容器外部的所有連線
server.listen(port, "0.0.0.0", () => {});

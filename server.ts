import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API routes FIRST
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const correctPassword = (process.env.ADMIN_PASSWORD || "alan_admin_2026").trim();
    const submittedPassword = (password || "").trim();
    
    if (submittedPassword === correctPassword) {
      res.json({ success: true, token: "asm_backend_auth_token_2026" });
    } else {
      res.status(401).json({ success: false, error: "Invalid access key" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

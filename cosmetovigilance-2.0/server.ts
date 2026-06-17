import express from "express";
import path from "path";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index.ts";
import { responses } from "./src/db/schema.ts";
import { requireAuth, AuthRequest, activeSessions } from "./src/middleware/auth.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/admin/login", (req, res) => {
    try {
      const { email, password } = req.body;
      
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@survey.app';
      const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecure2026!';

      if (
        (email === adminEmail || email === 'alih84513@gmail.com') && 
        password === adminPassword
      ) {
        const token = crypto.randomBytes(32).toString('hex');
        activeSessions.add(token);
        res.json({ status: "success", token, email });
      } else {
        res.status(401).json({ error: "Invalid email or password." });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error during login." });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      activeSessions.delete(token);
    }
    res.json({ status: "success" });
  });

  app.post("/api/submit", async (req, res) => {
    try {
      const payload = req.body;
      
      const participantInfo = {
        fullName: payload.fullName || '',
        department: payload.department || '',
        studyYear: payload.studyYear || '',
        gender: payload.gender || '',
        age: payload.age || ''
      };

      const keysToRemove = ['fullName', 'department', 'studyYear', 'gender', 'age', 'Timestamp'];
      const answers = { ...payload };
      keysToRemove.forEach(k => delete answers[k]);

      await db.insert(responses).values({
        ...participantInfo,
        answers: answers
      });

      res.json({ status: "success" });
    } catch (error) {
      console.error("Database query failed:", error);
      res.status(500).json({ error: "Failed to submit survey." });
    }
  });

  app.get("/api/responses", requireAuth, async (req: AuthRequest, res) => {
    try {
      // Basic check to see if the user is an admin.
      // E.g. we can just allow anyone who authenticates to view,
      // but for "admin only", we could check their email or just assume anyone who logs in is an admin (since only they should know about /admin route).
      // We will allow anyone with a valid Google login (for demonstration), but the prompt requested Admin login with email and password.
      // Note: we'll implement email/password login in the frontend using signInWithEmailAndPassword, but they must set it up in Firebase Console.
      
      const allResponses = await db.select().from(responses);
      res.json(allResponses);
    } catch (error) {
      console.error("Failed to fetch responses:", error);
      res.status(500).json({ error: "Failed to fetch responses." });
    }
  });

  app.delete("/api/admin/submissions/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid submission ID." });
        return;
      }
      
      const deleted = await db.delete(responses).where(eq(responses.id, id));
      res.json({ status: "success", message: "Submission deleted successfully." });
    } catch (error) {
      console.error("Failed to delete submission:", error);
      res.status(500).json({ error: "Failed to delete submission." });
    }
  });

  // Check if we should run in production mode (compiled version serving static files)
  const isProd = process.env.NODE_ENV === "production" || 
                 (typeof __filename !== 'undefined' && __filename.includes("server.cjs")) ||
                 !fs.existsSync(path.join(process.cwd(), "server.ts"));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // If running in the compiled server.cjs, __dirname is the "dist" folder itself.
    const runningFromDist = (typeof __filename !== 'undefined' && __filename.includes("server.cjs"));
    const distPath = runningFromDist
      ? __dirname
      : (fs.existsSync(path.join(process.cwd(), "dist")) ? path.join(process.cwd(), "dist") : __dirname);

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

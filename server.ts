import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Existing API endpoints for the mobile dashboard
  app.get("/api/analytics", (req, res) => {
    const timeRange = (req.query.range as string) || "24h";
    
    // Generate dynamic metrics based on time range
    const multiplier = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 1;
    
    const analytics = {
      timestamp: new Date().toISOString(),
      timeRange,
      overview: {
        activeUsers: Math.floor(14250 * (multiplier > 1 ? multiplier * 0.8 : 1)),
        activeUsersChange: "+12.4%",
        totalRevenue: Number((128450 * multiplier).toFixed(2)),
        revenueChange: "+8.2%",
        conversionRate: "4.8%",
        conversionChange: "+0.5%",
        avgResponseTime: "142ms",
        responseChange: "-18ms",
      },
      trafficTrend: [
        { time: "00:00", users: 1200, pageViews: 3400, bounceRate: 42 },
        { time: "04:00", users: 850, pageViews: 2100, bounceRate: 45 },
        { time: "08:00", users: 3400, pageViews: 8900, bounceRate: 38 },
        { time: "12:00", users: 6200, pageViews: 15400, bounceRate: 31 },
        { time: "16:00", users: 5100, pageViews: 12800, bounceRate: 35 },
        { time: "20:00", users: 4300, pageViews: 10200, bounceRate: 39 },
      ],
      trafficSources: [
        { name: "Direct", value: 45, color: "#3b82f6" },
        { name: "Organic Search", value: 30, color: "#10b981" },
        { name: "Social Media", value: 15, color: "#f59e0b" },
        { name: "Referral", value: 10, color: "#8b5cf6" },
      ]
    };
    res.json(analytics);
  });

  app.get("/api/performance", (req, res) => {
    const performanceData = {
      timestamp: new Date().toISOString(),
      userMetrics: {
        overallScore: 94.2,
        scoreChange: "+3.8%",
        tasksCompleted: 342,
        tasksTarget: 380,
        efficiencyRate: "96.5%",
        focusTimeHours: "38.5 hrs",
      },
      departmentScores: [
        { category: "Engineering", score: 96, benchmark: 90 },
        { category: "Design", score: 92, benchmark: 88 },
        { category: "Marketing", score: 89, benchmark: 85 },
        { category: "Support", score: 95, benchmark: 91 },
        { category: "Sales", score: 91, benchmark: 87 },
      ],
      weeklyPerformance: [
        { day: "Mon", score: 88, target: 85, output: 65 },
        { day: "Tue", score: 92, target: 85, output: 78 },
        { day: "Wed", score: 95, target: 85, output: 84 },
        { day: "Thu", score: 91, target: 85, output: 72 },
        { day: "Fri", score: 96, target: 85, output: 90 },
        { day: "Sat", score: 85, target: 80, output: 50 },
        { day: "Sun", score: 89, target: 80, output: 58 },
      ],
      topPerformers: [
        { id: 1, name: "Elena Rostova", role: "Senior Architect", score: 98, avatar: "ER" },
        { id: 2, name: "Marcus Chen", role: "Lead Product Designer", score: 96, avatar: "MC" },
        { id: 3, name: "Sarah Jenkins", role: "DevOps Engineer", score: 95, avatar: "SJ" },
        { id: 4, name: "David Kim", role: "Growth Lead", score: 93, avatar: "DK" },
      ]
    };
    res.json(performanceData);
  });

  app.get("/api/events", (req, res) => {
    const events = [
      { id: "e1", type: "deployment", message: "Production deployment v2.4.1 completed successfully", timestamp: "2 mins ago", status: "success" },
      { id: "e2", type: "alert", message: "High traffic spike detected in EU-Central region", timestamp: "14 mins ago", status: "warning" },
      { id: "e3", type: "user", message: "New enterprise tenant onboarding: Acme Corp", timestamp: "32 mins ago", status: "info" },
      { id: "e4", type: "performance", message: "API response time optimized to <140ms average", timestamp: "1 hour ago", status: "success" },
    ];
    res.json({ events });
  });

  app.post("/api/metrics/refresh", (req, res) => {
    res.json({ success: true, message: "Metrics successfully synchronized with telemetry stream", timestamp: new Date().toISOString() });
  });

  // Vite middleware setup for development, static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

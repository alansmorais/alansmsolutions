var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const erpReferralsStore = [];
  app.get("/api/erp/referrals", (req, res) => {
    res.json({ success: true, referrals: erpReferralsStore });
  });
  app.post("/api/erp/referrals", (req, res) => {
    const { companyName, contactName, phone, email, solutionType } = req.body;
    if (!companyName || !contactName) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    const newRef = {
      id: "ERP-REF-" + Math.floor(1e3 + Math.random() * 9e3),
      companyName,
      contactName,
      phone: phone || "",
      email: email || "",
      solutionType: solutionType || "booking",
      status: "pending",
      commissionAmount: "400 PLN",
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    erpReferralsStore.unshift(newRef);
    res.json({ success: true, referral: newRef, message: "Successfully synced with ERP backend" });
  });
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

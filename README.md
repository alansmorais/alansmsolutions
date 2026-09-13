# AlanSM Solutions - Business Automation Portal

Professional business automation platform focusing on **0% commission systems** (DeliveryHub), booking platforms, and CRM solutions for the **European (Kraków, Poland)** and **Latin American (São Sebastião, Brazil)** markets.

## 🚀 Deployment (GitHub Pages)

This application is now a **pure static SPA**, making it extremely easy to host for free on **GitHub Pages**.

1.  **Export to GitHub**: Use the AI Studio settings to push your code.
2.  **Enable GitHub Pages**:
    - Go to your repository **Settings > Pages**.
    - Under **Build and deployment > Source**, select **GitHub Actions**.
3.  **Automatic Deployment**: Every push to the `main` branch will now automatically build and deploy your site.

---

## 🛠 Tech Stack (Simplified)

- **Frontend**: React 18, Vite (Static SPA).
- **Backend**: Google Apps Script (Serverless Lead Capture).
- **Hosting**: GitHub Pages (Free).

## ⚙️ Configuration

To run this application, you need to set the following environment variables:

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API Key for AI features. |
| `VITE_CONTACT_API_URL` | URL for the Lead Capture endpoint (Google Apps Script). |

## 🏗 Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Build for production**:
    ```bash
    npm run build
    ```

---

**Developed with Precision by AlanSM Solutions.**
*Kraków, PL • São Sebastião, BR • Remote*

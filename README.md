
## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) & npm (Node Package Manager)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

Open your terminal or command prompt and run:

```bash
git clone <YOUR_GIT_URL>
```

**2. Navigate to the project directory**

```bash
cd <YOUR_PROJECT_NAME>
```

**3. Install Dependencies**

```bash
npm install
```
*(Note: This project also contains a `bun.lockb` file. If you prefer using Bun, you can run `bun install` instead).*

**4. Configure Environment Variables**

Since this project uses Supabase, you may need to set up your environment variables.
1. Create a file named `.env` in the root directory.
2. Add your necessary API keys (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

**5. Start the Development Server**

```bash
npm run dev
```

Once the server starts, open your browser and navigate to the local URL provided (usually `http://localhost:8080` or `http://localhost:5173`).

## 📦 Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled files ready for deployment.

## ☁️ Deployment

You can deploy this project to any static hosting provider. Recommended options include:

- **Netlify:** Connect your GitHub repository and set the build command to `npm run build` and the publish directory to `dist`.
- **Vercel:** Import your project; Vercel usually detects Vite settings automatically.

# 🌐 How to Deploy Your Expense Tracker

Deploying a project with **SQLite** is a bit different from other databases because SQLite is just a file on your computer. When you deploy to a service like **Vercel** (the most popular choice for Next.js), that file resets every time you update your code!

Here are the two ways to handle this:

---

## 🛠 Option A: The "Pro" Way (Vercel + Neon/Supabase)
This is the standard way to deploy Next.js apps. You keep your code the same, but you swap the "Local File" for a "Cloud Database".

1.  **Push to GitHub:** Create a repository and push your code.
2.  **Create a Cloud Database:** 
    - Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
    - Create a new project and copy the **DATABASE_URL** (connection string).
3.  **Update `schema.prisma`:**
    Change your provider to `postgresql`:
    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```
4.  **Deploy to Vercel:**
    - Connect your GitHub repo to [Vercel](https://vercel.com).
    - Add the **Environment Variable** `DATABASE_URL` with the string you copied in step 2.
5.  **Build Command:** Vercel will automatically run your app!

---

## ☁️ Option B: Cloud SQLite (Vercel + Turso)
If you want to stay with **SQLite** specifically but have it live in the cloud:

1.  **Signup for [Turso](https://turso.tech):** This is a database service that uses SQLite but puts it in the cloud.
2.  **Update Prisma:** Use the `@prisma/adapter-libsql` to connect Prisma to Turso.
3.  **Config:** Same as Vercel above, just provide the Turso connection URL.

---

## 🚀 Option C: The "Direct" Way (Render)
If you want to keep your **exact same SQLite file**:

1.  Host on [Render](https://render.com) using a **Web Service**.
2.  **Persistent Disk:** You must add a "Disk" in Render's settings. This ensures your `dev.db` file isn't deleted when the server restarts.
3.  **Path:** Set your database path to `/var/data/dev.db` inside your `.env`.

---

### 💡 Recommendation for Beginners
I recommend **Option A (Vercel + Neon/Supabase)**. 
**Why?**
- It's **100% Free** for small projects.
- It's **extremely fast**.
- It's how 90% of modern web apps are actually built.

**Would you like me to help you convert your current SQLite setup to work with a Cloud Database (Postgres) for deployment?**

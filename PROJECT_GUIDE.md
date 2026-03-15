# 🚀 Expense Tracker Build Guide

This document tracks our progress and explains every step we are taking to build this Personal Expense Tracker.

## 📍 Current Status: Phase 3 Completed (UI & Logic Implementation)
We have successfully scaffolded the project, connected the database, and built the core user interface with working add/delete functionality.

---

## 🛠 Project Stages in Detail

### Stage 1: The Foundation (Next.js Setup) ✅
**What we did:** Initialized a new Next.js project using the App Router, TypeScript, and Tailwind CSS.
**Why:** Next.js is our 'all-in-one' framework. It handles both the frontend (what you see) and the backend (saving data).
- **TypeScript:** Helps us catch bugs by ensuring our data (like 'amount') is always the right type.
- **Tailwind CSS:** Allows us to style the app quickly using classes without writing separate CSS files.

### Stage 2: The Data Engine (Prisma & SQLite) ✅
**What we did:** 
1. Installed **Prisma** (an ORM).
2. Defined the `Expense` model in `prisma/schema.prisma`.
3. Created a `dev.db` file using SQLite.
**Why:** 
- **SQLite:** A simple database that lives in a file inside your project folder—no need to install a heavy database server.
- **Prisma:** Acts as a translator between our code and the database. Instead of writing complex SQL queries, we write simple JavaScript functions like `prisma.expense.create()`.

### Stage 3: The Logic (Server Actions) ✅
**What we did:** Created `src/app/actions.ts` to handle creating and deleting expenses.
**Why:** Next.js **Server Actions** allow us to write functions that run directly on the server. When you click 'Add', the form data is sent to these actions, which then tell Prisma to update the database.
- **revalidatePath('/'):** This tells Next.js to refresh the page automatically so you see your new expense immediately.

### Stage 4: The Interface (The Dashboard) ✅
**What we did:** Built the UI in `src/app/page.tsx`.
**Why:** This is the 'Face' of our app. We used **vibrant gradients**, **glassmorphism** (semi-transparent backgrounds), and a **dark theme** to give it a premium, modern feel.
- **Server Components:** The page fetches the list of expenses directly from the database before showing it to you, making it extremely fast.

### Stage 5: Polish & Run 🚀
**What to do next:** 
1. The app should already be refreshing in your browser!
2. If it's still showing the old page, try stopping and restarting the server in the terminal with `npm run dev`.
3. Observe how the summary updates automatically when you add items.

---

## 📂 File Map
- `prisma/schema.prisma`: Where your database tables are defined.
- `src/app/page.tsx`: The main UI of your application.
- `src/app/actions.ts`: The 'Brains' that handle adding/deleting data.
- `src/lib/prisma.ts`: A helper file to make sure we only have one connection to the database.

---

**Next Step:** Enjoy your new Expense Tracker!

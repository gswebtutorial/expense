# 🛠 Junior Developer Practice: Build an Expense Tracker

Welcome! This guide will walk you through building a **Personal Expense Tracker** using Next.js, Prisma, and SQLite. This is an excellent project to learn Full-stack development with modern tools.

---

## 🏗 Stage 1: Project Scaffolding
First, we need to create the skeleton of our application.

### Command:
```bash
npx create-next-app@latest expense-tracker --typescript --tailwind --eslint --app --src-dir false --use-npm
```
**Explanation:** 
- `npx`: Runs the tool without installing it globally.
- `--typescript`: Uses types to catch bugs early.
- `--tailwind`: Sets up our styling system.
- `--app`: Uses the modern Next.js App Router.

---

## 🗄 Stage 2: Database Setup (Prisma)
We need a place to store data. We'll use **SQLite** (a local file database) and **Prisma** (to talk to it).

### Commands:
1. **Install Prisma:**
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```
   *Explanation: Installs the tool to manage the database and the library to talk to it from code.*

2. **Initialize Prisma:**
   ```bash
   npx prisma init --datasource-provider sqlite
   ```
   *Explanation: Creates a `prisma` folder and a `.env` file for configuration.*

---

## 📝 Stage 3: Define the Schema
Open `prisma/schema.prisma` and add our model. This is the blueprint for our data.

### Code (`prisma/schema.prisma`):
```prisma
model Expense {
  id          Int      @id @default(autoincrement())
  amount      Float
  description String
  category    String
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Apply the changes:
```bash
npx prisma db push
```
**Explanation:** This creates the actual `dev.db` file based on the blueprint you just wrote.

---

## 🔌 Stage 4: The Database Helper
Create `src/lib/prisma.ts`. This ensures we don't open too many connections to the database during development.

### Code (`src/lib/prisma.ts`):
```typescript
import { PrismaClient } from '@prisma/client';
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 🧠 Stage 5: Server Actions (Logic)
Create `src/app/actions.ts`. These functions run on the server to handle data.

### Code Snippet:
```typescript
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createExpense(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  // ... extract description & category
  await prisma.expense.create({ data: { amount, description, category } });
  revalidatePath('/'); // Refresh the page instantly
}
```

---

## 🎨 Stage 6: The User Interface
Edit `src/app/page.tsx` to build the dashboard.

**Key Features to include:**
- A **Total Card** to show the sum of all expenses.
- A **Form** to add new expenses.
- A **List** to display recent activities with a delete button.

---

## 🚀 Stage 7: Run Locally
Start your development server to see the result.

### Command:
```bash
npm run dev
```
**URL:** Open [http://localhost:3000](http://localhost:3000)

---

## 🌟 Extra Credit (Challenges)
Once you finish the basics, try adding these:
1. **WhatsApp Sharing:** Use `https://wa.me/?text=...` to share a summary.
2. **Rupee Formatting:** Use `toLocaleString('en-IN')` for Indian currency.
3. **Categories:** Add a dropdown to filter expenses by 'Food' or 'Bills'.

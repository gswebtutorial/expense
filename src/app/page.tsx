import { prisma } from '@/lib/prisma';
import { createExpense, deleteExpense } from './actions';

export default async function Home() {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const now = new Date();
  const currentMonthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = currentMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const monthName = now.toLocaleString('default', { month: 'long' });
  const shareText = `*📝 Expense Summary (${monthName} ${now.getFullYear()})*\n\n*Total:* ₹${monthTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\n*Details:*\n${currentMonthExpenses.map(e => `- ${e.description}: ₹${e.amount.toFixed(2)}`).join('\n')}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-neutral-400 text-base md:text-lg">Manage your daily spending with style and ease.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl transition hover:border-blue-500/50 overflow-hidden">
            <div className="absolute top-4 right-4 group-hover:scale-110 transition">
               <a 
                 href={whatsappUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 title="Share this month's summary on WhatsApp"
                 className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.822 11.822 0 001.597 5.95L0 24l6.103-1.594a11.811 11.811 0 005.937 1.637h.005c6.637 0 12.05-5.414 12.053-12.051a11.82 11.82 0 00-3.536-8.451"/>
                 </svg>
               </a>
            </div>
            <h2 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Total Expenses</h2>
            <p className="text-4xl font-bold text-white">
              ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl">
            <form action={createExpense} className="flex flex-col md:flex-row gap-4">
              <input
                name="description"
                placeholder="Description (e.g. Groceries)"
                required
                className="flex-1 bg-neutral-800 border-none rounded-xl px-4 py-3 placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                name="amount"
                type="number"
                step="0.01"
                placeholder="Amount"
                required
                className="md:w-32 bg-neutral-800 border-none rounded-xl px-4 py-3 placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                name="category"
                required
                className="md:w-40 bg-neutral-800 border-none rounded-xl px-4 py-3 placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95"
              >
                Add
              </button>
            </form>
          </div>
        </section>

        <section className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
          </div>
          <div className="divide-y divide-neutral-800">
            {expenses.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 italic">
                No expenses logged yet. Start by adding one above!
              </div>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="group flex items-center justify-between p-6 hover:bg-neutral-800/30 transition">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                       <span className="text-xl">💸</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{expense.description}</p>
                      <p className="text-sm text-neutral-500 tracking-wide">
                        {expense.category} • {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-lg font-bold text-white">
                      ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                    {/* Simplified delete form for demonstration */}
                    <form action={async (formData) => {
                      'use server';
                      await deleteExpense(expense.id);
                    }}>
                      <button className="p-2 text-neutral-600 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createExpense(formData: FormData) {
  const amountStr = formData.get('amount') as string;
  const amount = parseFloat(amountStr);
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;

  if (isNaN(amount) || !description || !category) {
    throw new Error('Invalid input');
  }

  await prisma.expense.create({
    data: {
      amount,
      description,
      category,
    },
  });

  revalidatePath('/');
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({
    where: { id },
  });

  revalidatePath('/');
}

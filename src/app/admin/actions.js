'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function loginAdmin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const admin = await prisma.admin.findUnique({
        where: { email },
    });

    if (!admin) {
        return { error: 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል!' };
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
        return { error: 'የተሳሳተ ኢሜይል ወይም የይለፍ ቃል!' };
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_session', admin.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });

    redirect('/admin');
}
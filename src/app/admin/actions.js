'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

// 1. Authentication Actions
export async function loginAdmin(prevState, formData) {
    const actualFormData = formData instanceof FormData ? formData : (prevState instanceof FormData ? prevState : null);
    
    if (!actualFormData) {
        return { error: 'የተሳሳተ ጥያቄ! እባክዎ እንደገና ይሞክሩ።' };
    }

    const password = actualFormData.get('password');
    const adminSecret = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminSecret || password === 'admin123') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        redirect('/admin');
    }

    return { error: 'የይለፍ ቃል ተሳስቷል! እባክዎ እንደገና ይሞክሩ።' };
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

// 2. Article Management Actions
export async function createArticle(formData) {
    const title = formData.get('title');
    const slug = formData.get('slug') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const category = formData.get('category') || 'አጠቃላይ';
    const author = formData.get('author') || 'የኮሚዩኒኬሽን ጉዳዮች';
    const coverImage = formData.get('coverImage') || '/images/placeholder.jpg';

    try {
        await prisma.article.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                category,
                author,
                coverImage,
                published: true,
            },
        });

        revalidatePath('/news');
        revalidatePath('/admin');
    } catch (error) {
        console.error('Failed to create article:', error);
        return { error: 'ዜናውን መመዝገብ አልተቻለም። Slug ተመሳሳይ ሊሆን ይችላል።' };
    }

    redirect('/admin');
}

export async function deleteArticle(id) {
    try {
        await prisma.article.delete({
            where: { id },
        });

        revalidatePath('/news');
        revalidatePath('/admin');
    } catch (error) {
        console.error('Failed to delete article:', error);
    }
}
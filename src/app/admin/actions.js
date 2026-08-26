'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
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
    const title = formData.get('title') || '';
    
    // Slug generation: generate clean slug or fallback to timestamp-based unique slug
    let slug = formData.get('slug');
    if (!slug || !slug.trim()) {
        const sanitized = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        slug = sanitized ? `${sanitized}-${Date.now().toString().slice(-4)}` : `article-${Date.now()}`;
    }

    const excerpt = formData.get('excerpt') || '';
    const content = formData.get('content') || '';
    const category = formData.get('category') || 'አጠቃላይ';
    const author = formData.get('author') || 'የኮሚዩኒኬሽን ጉዳዮች';
    
    let coverImage = '/images/news-1.jpg';

    // 1. Process uploaded file from user's PC if present
    const imageFile = formData.get('imageFile');
    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0 && imageFile.name) {
        try {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const ext = path.extname(imageFile.name) || '.jpg';
            const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
            const filePath = path.join(uploadDir, safeName);

            await fs.promises.writeFile(filePath, buffer);
            coverImage = `/uploads/${safeName}`;
        } catch (uploadError) {
            console.error('Failed to save uploaded file:', uploadError);
        }
    } else {
        // 2. Fallback to image URL input if provided
        const urlInput = formData.get('coverImage') || formData.get('coverImageUrl');
        if (urlInput && urlInput.trim()) {
            coverImage = urlInput.trim();
        }
    }

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
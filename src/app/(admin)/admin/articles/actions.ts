// src/app/(admin)/admin/articles/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Define shared schema/type for article data (used by form and actions)
const articleActionSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    snippet: z.string().min(1),
    body: z.string().min(1),
    categoryId: z.string().min(1),
    author: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
    imageHint: z.string().optional(),
    status: z.enum(['Published', 'Draft']),
});

export type ArticleDataInput = z.infer<typeof articleActionSchema>;

// Define the shape of the data returned for editing (might include relational data)
export interface ArticleData {
    id: string;
    title: string;
    slug: string;
    snippet: string;
    body: string;
    category?: { id: string; name: string }; // Include category details
    author?: string;
    publishDate: Date; // Assuming this exists
    imageUrl?: string;
    imageHint?: string;
    status: 'Published' | 'Draft';
}

interface ActionResult<T = null> {
    success: boolean;
    error?: string;
    data?: T;
}

// --- Mock Data Store (Replace with DB interactions) ---
let mockArticlesDb: ArticleData[] = Array.from({ length: 15 }, (_, i) => ({
    id: `article-id-${i + 1}`,
    slug: `article-${i + 1}`,
    title: `Headline News Story ${i + 1}: A Deep Dive`,
    snippet: `This is a preview snippet for article ${i + 1}.`,
    body: `<p>Full body content for article ${i + 1}.</p>`,
    category: { id: `cat-id-${(i % 4) + 1}`, name: ['Technology', 'Politics', 'World', 'Business'][i % 4] },
    publishDate: new Date(2024, 5, 20 - i),
    author: i % 3 === 0 ? undefined : `Author ${String.fromCharCode(65 + (i % 5))}`,
    imageUrl: `https://picsum.photos/seed/${i+1}/600/400`,
    imageHint: `mock hint ${i+1}`,
    status: i % 4 === 0 ? 'Draft' : 'Published',
}));
// --- End Mock Data Store ---

// --- Action Implementations ---

export async function createArticleAction(data: ArticleDataInput): Promise<ActionResult> {
    console.log("Server Action: createArticleAction", data);
    try {
        // Validate data server-side
        const validation = articleActionSchema.safeParse(data);
        if (!validation.success) {
            console.error("Create validation failed:", validation.error.errors);
            return { success: false, error: "Invalid article data provided." };
        }

        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check for duplicate slug (example validation)
        if (mockArticlesDb.some(a => a.slug === data.slug)) {
             return { success: false, error: "Slug already exists. Please choose a unique slug." };
        }

        const newArticle: ArticleData = {
            id: `article-id-${Date.now()}`, // Generate a pseudo-unique ID
            publishDate: new Date(), // Set publish date on creation
            category: { id: data.categoryId, name: `Category ${data.categoryId}` }, // Fetch real name in real app
            ...data,
        };
        mockArticlesDb.push(newArticle);
        console.log("Article created:", newArticle.id);

        // Revalidate paths to update caches
        revalidatePath('/admin/articles');
        revalidatePath('/'); // Revalidate homepage
        revalidatePath(`/articles/${newArticle.slug}`); // Revalidate detail page
        revalidatePath(`/?category=${newArticle.category.name.toLowerCase()}`); // Revalidate category page (if using slug)

        return { success: true };
    } catch (error) {
        console.error('Create Article Action Error:', error);
        return { success: false, error: 'Failed to create article due to a server error.' };
    }
}

export async function updateArticleAction(articleId: string, data: ArticleDataInput): Promise<ActionResult> {
    console.log("Server Action: updateArticleAction", articleId, data);
    try {
        // Validate data server-side
        const validation = articleActionSchema.safeParse(data);
        if (!validation.success) {
             console.error("Update validation failed:", validation.error.errors);
            return { success: false, error: "Invalid article data provided." };
        }

        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 500));

        const articleIndex = mockArticlesDb.findIndex(a => a.id === articleId);
        if (articleIndex === -1) {
            return { success: false, error: "Article not found." };
        }

         // Check for duplicate slug (excluding the current article)
         if (mockArticlesDb.some(a => a.slug === data.slug && a.id !== articleId)) {
             return { success: false, error: "Slug already exists. Please choose a unique slug." };
         }


        // Update the article data
        const originalArticle = mockArticlesDb[articleIndex];
        mockArticlesDb[articleIndex] = {
            ...originalArticle, // Keep original ID and publishDate
            ...data, // Apply updates
            category: { id: data.categoryId, name: `Category ${data.categoryId}` }, // Fetch real name in real app
        };
        console.log("Article updated:", articleId);

        // Revalidate relevant paths
        revalidatePath('/admin/articles');
        revalidatePath('/');
        // Revalidate old slug path if it changed
        if (originalArticle.slug !== data.slug) {
           revalidatePath(`/articles/${originalArticle.slug}`);
        }
        revalidatePath(`/articles/${data.slug}`);
        revalidatePath(`/?category=${mockArticlesDb[articleIndex].category?.name.toLowerCase()}`); // Revalidate category page


        return { success: true };
    } catch (error) {
        console.error('Update Article Action Error:', error);
        return { success: false, error: 'Failed to update article due to a server error.' };
    }
}

export async function deleteArticleAction(articleId: string): Promise<ActionResult> {
    console.log("Server Action: deleteArticleAction", articleId);
    try {
        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 500));

        const articleIndex = mockArticlesDb.findIndex(a => a.id === articleId);
        if (articleIndex === -1) {
            return { success: false, error: "Article not found." };
        }

        const deletedArticle = mockArticlesDb[articleIndex];
        mockArticlesDb.splice(articleIndex, 1); // Remove article
        console.log("Article deleted:", articleId);

        // Revalidate paths
        revalidatePath('/admin/articles');
        revalidatePath('/');
        revalidatePath(`/articles/${deletedArticle.slug}`);
        if (deletedArticle.category) {
          revalidatePath(`/?category=${deletedArticle.category.name.toLowerCase()}`);
        }


        return { success: true };
    } catch (error) {
        console.error('Delete Article Action Error:', error);
        return { success: false, error: 'Failed to delete article due to a server error.' };
    }
}

export async function getArticleForEditAction(articleId: string): Promise<ActionResult<ArticleData>> {
     console.log("Server Action: getArticleForEditAction", articleId);
    try {
        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 100));

        const article = mockArticlesDb.find(a => a.id === articleId);

        if (!article) {
            return { success: false, error: "Article not found." };
        }

        // Return the full data needed for the form
        return { success: true, data: article };

    } catch (error) {
        console.error('Get Article for Edit Action Error:', error);
        return { success: false, error: 'Failed to fetch article data.' };
    }
}

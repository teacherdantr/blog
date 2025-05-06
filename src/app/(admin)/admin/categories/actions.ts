// src/app/(admin)/admin/categories/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

interface Category {
    id: string;
    name: string;
}

interface ActionResult<T = null> {
    success: boolean;
    error?: string;
    data?: T;
}

const addCategorySchema = z.object({
    name: z.string().min(2).max(50),
});

// --- Mock Data Store (Replace with DB interactions) ---
let mockCategoriesDb: Category[] = [
    { id: 'cat-id-1', name: 'Technology' },
    { id: 'cat-id-2', name: 'Politics' },
    { id: 'cat-id-3', name: 'World' },
    { id: 'cat-id-4', name: 'Business' },
];
// Assume mockArticlesDb exists here for checking usage
import { ArticleData } from '../articles/actions'; // Assuming ArticleData is exported
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


export async function addCategoryAction(data: z.infer<typeof addCategorySchema>): Promise<ActionResult> {
    console.log("Server Action: addCategoryAction", data);
    try {
        const validation = addCategorySchema.safeParse(data);
        if (!validation.success) {
            console.error("Add Category validation failed:", validation.error.errors);
            return { success: false, error: "Invalid category name." };
        }

        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 300));

        // Check for duplicate name (case-insensitive)
        if (mockCategoriesDb.some(cat => cat.name.toLowerCase() === data.name.toLowerCase())) {
            return { success: false, error: `Category "${data.name}" already exists.` };
        }

        const newCategory: Category = {
            id: `cat-id-${Date.now()}`, // Generate pseudo-unique ID
            name: data.name,
        };
        mockCategoriesDb.push(newCategory);
        console.log("Category added:", newCategory.id, newCategory.name);

        // Revalidate path to update the category list UI
        revalidatePath('/admin/categories');
         // Also revalidate article forms where categories might be selected
         revalidatePath('/admin/articles/new');
         // Potentially revalidate edit pages too, though less critical immediately
         // revalidatePath('/admin/articles/edit', 'layout');


        return { success: true };
    } catch (error) {
        console.error('Add Category Action Error:', error);
        return { success: false, error: 'Failed to add category due to a server error.' };
    }
}

export async function deleteCategoryAction(categoryId: string): Promise<ActionResult> {
    console.log("Server Action: deleteCategoryAction", categoryId);
    try {
        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 300));

        // Check if category exists
        const categoryIndex = mockCategoriesDb.findIndex(cat => cat.id === categoryId);
        if (categoryIndex === -1) {
            return { success: false, error: "Category not found." };
        }

        // **Important Check**: Prevent deletion if category is used by articles
        const isCategoryUsed = mockArticlesDb.some(article => article.category?.id === categoryId);
        if (isCategoryUsed) {
            console.warn(`Attempted to delete category ${categoryId} which is in use.`);
            return { success: false, error: "Cannot delete category because it is currently assigned to one or more articles." };
        }

        // Remove category
        mockCategoriesDb.splice(categoryIndex, 1);
        console.log("Category deleted:", categoryId);

        // Revalidate path to update the list
        revalidatePath('/admin/categories');
        // Revalidate article forms
        revalidatePath('/admin/articles/new');
        // revalidatePath('/admin/articles/edit', 'layout');

        return { success: true };
    } catch (error) {
        console.error('Delete Category Action Error:', error);
        return { success: false, error: 'Failed to delete category due to a server error.' };
    }
}

export async function getAllCategoriesAction(): Promise<ActionResult<Category[]>> {
     console.log("Server Action: getAllCategoriesAction");
    try {
        // Simulate DB operation
        await new Promise(resolve => setTimeout(resolve, 100));

        // Return a copy of the categories
        return { success: true, data: [...mockCategoriesDb] };
    } catch (error) {
        console.error('Get All Categories Action Error:', error);
        return { success: false, error: 'Failed to fetch categories.' };
    }
}

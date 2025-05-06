'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use App Router's useRouter

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { createArticleAction, updateArticleAction } from '../actions'; // Import server actions
import type { ArticleData } from '../actions'; // Import type

// Define Zod schema for article form validation
const articleSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }).max(150, { message: 'Title cannot exceed 150 characters.' }),
  slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens.' }),
  snippet: z.string().min(10, { message: 'Snippet must be at least 10 characters long.' }).max(300, { message: 'Snippet cannot exceed 300 characters.' }),
  body: z.string().min(50, { message: 'Body must be at least 50 characters long.' }),
  categoryId: z.string().min(1, { message: 'Please select a category.' }),
  author: z.string().optional(),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')), // Optional URL
  imageHint: z.string().max(50, { message: 'Image hint cannot exceed 50 characters.'}).optional(),
  status: z.enum(['Published', 'Draft']),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  mode: 'create' | 'edit';
  initialData?: ArticleData;
  articleId?: string; // Required for edit mode
  categories: { id: string; name: string }[];
}

export function ArticleForm({ mode, initialData, articleId, categories }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData ? {
        ...initialData,
        categoryId: initialData.category?.id || "", // Handle potential undefined category
        status: initialData.status || 'Draft', // Default to Draft if not provided
        imageUrl: initialData.imageUrl || '',
        imageHint: initialData.imageHint || '',
      } : {
      title: '',
      slug: '',
      snippet: '',
      body: '',
      categoryId: '',
      author: '',
      imageUrl: '',
      imageHint: '',
      status: 'Draft',
    },
  });

  // Generate slug from title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    form.setValue('title', title);
    // Only update slug if it's empty or in create mode to avoid overwriting manual changes
    if (mode === 'create' || !form.getValues('slug')) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single
      form.setValue('slug', slug);
    }
  };


  async function onSubmit(data: ArticleFormValues) {
    setIsLoading(true);
    console.log("Submitting article data:", data);

     // Prepare data for the action, ensuring categoryId is included
     const articlePayload = {
        ...data,
        categoryId: data.categoryId, // Ensure categoryId is correctly passed
     };

    try {
      let result;
      if (mode === 'create') {
        result = await createArticleAction(articlePayload);
      } else if (articleId) {
        result = await updateArticleAction(articleId, articlePayload);
      } else {
         throw new Error("Article ID is missing for edit mode.");
      }

      if (result.success) {
        toast({
          title: `Article ${mode === 'create' ? 'Created' : 'Updated'}`,
          description: `"${data.title}" has been successfully ${mode === 'create' ? 'created' : 'updated'}.`,
        });
        router.push('/admin/articles'); // Redirect back to the article list
        router.refresh(); // Trigger a data refresh on the target page
      } else {
        toast({
          title: `Error ${mode === 'create' ? 'Creating' : 'Updating'} Article`,
          description: result.error || `Could not ${mode === 'create' ? 'create' : 'update'} the article.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} article:`, error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} onChange={handleTitleChange} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Slug */}
             <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="auto-generated-slug" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>
                        Unique identifier for the URL (auto-generated from title, can be edited).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


            {/* Snippet */}
            <FormField
              control={form.control}
              name="snippet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Snippet</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short preview text shown in listings..." {...field} rows={3} disabled={isLoading}/>
                  </FormControl>
                  <FormDescription>
                    A brief summary (max 300 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full article content (supports basic HTML)..." {...field} rows={10} disabled={isLoading}/>
                  </FormControl>
                   <FormDescription>
                     Main content of the article. You can use basic HTML tags like &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                       {categories.length === 0 && <SelectItem value="loading" disabled>Loading categories...</SelectItem>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Author (Optional) */}
             <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Author's name" {...field} value={field.value ?? ''} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             {/* Image URL (Optional) */}
             <FormField
               control={form.control}
               name="imageUrl"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Image URL (Optional)</FormLabel>
                   <FormControl>
                     <Input type="url" placeholder="https://example.com/image.jpg" {...field} value={field.value ?? ''} disabled={isLoading}/>
                   </FormControl>
                   <FormDescription>URL for the main article image.</FormDescription>
                   <FormMessage />
                 </FormItem>
               )}
             />

              {/* Image Hint (Optional) */}
              <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image AI Hint (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., technology abstract" {...field} value={field.value ?? ''} disabled={isLoading}/>
                    </FormControl>
                    <FormDescription>One or two keywords for image generation hints (max 50 chars).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                   <div className="space-y-0.5">
                     <FormLabel className="text-base">Status</FormLabel>
                     <FormDescription>
                       Set the article to Published or keep it as a Draft.
                     </FormDescription>
                   </div>
                   <FormControl>
                     <div className="flex items-center space-x-2">
                       <span>Draft</span>
                       <Switch
                         checked={field.value === 'Published'}
                         onCheckedChange={(checked) => field.onChange(checked ? 'Published' : 'Draft')}
                         disabled={isLoading}
                         aria-readonly
                       />
                        <span>Published</span>
                     </div>
                   </FormControl>
                 </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
               <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                 Cancel
               </Button>
              <Button type="submit" disabled={isLoading}>
                 {isLoading ? 'Saving...' : (mode === 'create' ? 'Create Article' : 'Update Article')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addCategoryAction } from '../actions'; // Import server action

// Define Zod schema for category form validation
const categorySchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters long.' }).max(50, { message: 'Category name cannot exceed 50 characters.' }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryManager() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true);
    try {
      const result = await addCategoryAction(data);
      if (result.success) {
        toast({
          title: 'Category Added',
          description: `Category "${data.name}" has been successfully added.`,
        });
        form.reset(); // Reset form fields
        router.refresh(); // Refresh the page to show the new category in the list
      } else {
        toast({
          title: 'Error Adding Category',
          description: result.error || 'Could not add the category.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Add category error:', error);
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
      <CardHeader>
        <CardTitle>Add New Category</CardTitle>
        <CardDescription>Create a new category for articles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Technology" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Category'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

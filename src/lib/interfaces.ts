import { ReactNode } from 'react';

/**
 * Represents a single article with its core information.
 */
export interface Article {
  /** A unique identifier for the article. */
  id: string;
  /** A unique identifier for the article, used for generating URLs. */
  slug: string;
  /** The main headline or title of the article. */
  title: string;
  /** A brief summary or excerpt of the article content. */
  snippet: string;
  /** The author of the article (optional). */
  author?: string;
  /** The date the article was published. */
  publishDate: Date;
  /** The URL of the main image for the article. */
  imageUrl: string;
  /** A descriptive hint about the image content for accessibility or AI purposes. */
  imageHint: string;
  /** The category the article belongs to. This is a relation field. */
  category?: Category;
  /** The date and time the article was created. */
  createdAt: Date;
  /** The date and time the article was last updated. */
  updatedAt: Date;
}

/**
 * Represents a category that articles can belong to.
 * Used for organizing and filtering articles.
 */
export interface Category {
  /** A unique identifier for the category. */
  id: string;
  /** The display name of the category. */
  name: string;
  /** A unique identifier for the category, typically used in URLs. */
  slug: string;
  /** A React node representing the icon for the category. */
  icon: ReactNode;
  /** The date and time the category was created. */
  createdAt: Date;
  /** The date and time the category was last updated. */
  updatedAt: Date;
}
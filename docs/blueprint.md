# **App Name**: NewsFlash

## Core Features:

- Article Listing: Display a curated list of published articles on the homepage. Include title, preview snippet, author (optional), publish date, and category label. Paginate if more than 10 articles.
- Article Detail View: Route: /articles/[slug]. Full view of article: title, body (rich text/HTML), publish date, category, author. Related articles (optional).
- Category Filtering: Route: /categories/[category]. Display all articles belonging to the selected category. Category chips/tabs in sidebar or above the article list.
- Login: Simple login form for admin
- Login API: Accepts email + password, returns HttpOnly JWT cookie
- Logout: Clears the cookie
- Middleware: Protect all /admin routes, redirect if no valid session
- Admin Dashboard: Welcome page or stats
- Create Article: Article form
- Edit Article: Edit view
- Manage Categories: Add/delete categories
- AdminLayout: Shared layout (sidebar, nav)
- ArticleForm: New/edit article
- CategoryManager: Add/remove category
- DashboardNav: Sidebar nav
- Create Article API: Create article
- Update Article API: Update article
- Delete Article API: Delete article
- Add Category API: Add category
- Delete Category API: Delete category

## Style Guidelines:

- Background: #FFFFFF Main background
- Surface (cards): #F9FAFB Article cards, UI surfaces
- Text (primary): #111827 Headlines, body text
- Text (muted): #6B7280 Subtext, captions
- Accent: #2563EB Links, highlights (Blue-600)
- Accent Hover: #1D4ED8 Hovered buttons/links
- Border/Lines: #E5E7EB UI outlines, separators
- Background: #0F172A Main dark background
- Surface (cards): #1E293B Panels, cards, sections
- Text (primary): #F9FAFB Headings, main text
- Text (muted): #9CA3AF Subtle UI text
- Accent: #3B82F6 Blue-500 for actions/links
- Accent Hover: #60A5FA Brighter blue hover
- Border/Lines: #334155 Subtle borders
- Employ a responsive grid layout to ensure optimal viewing across devices.
- Use a consistent set of icons for categories and navigation.
- Responsive grid layout for cards and content.
- Max-width constraint for readability (e.g., max-w-3xl or prose for detail view).
- Use a clean 1–2 column layout:

Mobile: stacked single column.

Tablet/Desktop: grid layout (e.g., grid-cols-1 md:grid-cols-2 lg:grid-cols-3).
- Light & dark theme support (via Tailwind darkMode: 'class').
- Use modern, readable color palette:

Light: white backgrounds, dark text.

Dark: slate backgrounds, light text.
- Accent color: blue (e.g., blue-600 and blue-500).
- Use consistent icon set, preferably:

Heroicons (already Tailwind-compatible)
- Category icons (e.g., tech, politics, world)
- Nav icons (home, filter, etc.)
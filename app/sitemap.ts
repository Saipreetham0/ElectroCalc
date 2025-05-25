// app/sitemap.ts
import { MetadataRoute } from "next";

/**
 * Configuration for the sitemap generator
 */
const SITE_URL = "https://electro-calc.theskypedia.com";

/**
 * Define all the static pages in your application
 * You can add more properties to this if needed
 */
interface StaticPage {
  /** Page URL path (relative to site root) */
  path: string;
  /** Last modification date (optional) */
  lastModified?: Date;
  /** Change frequency hint (optional) */
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** Priority hint between 0.0 and 1.0 (optional) */
  priority?: number;
}

/**
 * List all static pages in your application
 * Paths must start with a slash and be relative to your app root
 */
const staticPages: StaticPage[] = [
  {
    path: "/",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    path: "/inverter-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/resistor-color-code-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/Star-Delta-Conversion",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/ohms-law-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/smd-resistor-code-decoder",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/capacitor-code-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/awg-wire-gauge-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/swg-wire-gauge-calculator",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/arduino-blogs",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/esp32-blogs",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/raspberry-pi-blogs",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
];

/**
 * Generate the sitemap
 * This function is automatically called by Next.js
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Convert static pages to sitemap format
  const staticSitemapEntries = staticPages.map(
    ({ path, lastModified, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  // You can dynamically generate additional URLs here by fetching from your CMS, database, etc.
  // For example, if you have blog posts stored in a database:

  // Example of dynamic URLs (uncomment and modify if needed)
  /*
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  const dynamicSitemapEntries = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  */

  // Combine all sitemap entries
  return [
    ...staticSitemapEntries,
    // ...dynamicSitemapEntries, // Uncomment if you added dynamic entries
  ];
}

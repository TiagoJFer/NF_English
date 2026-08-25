import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hook: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    readTime: z.string(),
    author: z.string().default('Natalia Fernandes'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog };

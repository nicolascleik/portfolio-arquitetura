import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content', 
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.enum(['Residencial', 'Comercial', 'Urbanismo', 'Interiores']),
    location: z.string(),
    year: z.number(),
    area: z.string(), 
    coverImage: image(),
    gallery: z.array(image()), 
    blueprint: z.string().optional(), 
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'projects': projectsCollection,
};
import {z, defineCollection } from "astro:content";

const postCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        date: z.date().transform((str) => new Date(str).toLocaleDateString()),
    })
});



const codeCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        language: z.string(),
        tags: z.array(z.string()),
        date: z.date().transform((str) => new Date(str).toLocaleDateString()),
})});

export const collections = {
    'posts': postCollection,
    'code': codeCollection
};

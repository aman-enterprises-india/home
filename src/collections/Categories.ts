import { slugField, type CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name", // Shows the Category Name in the sidebar and dropdowns
    defaultColumns: ["name", "slug", "updatedAt"],
  },
  access: {
    read: () => true, // Publicly readable for your website navigation
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true, // Prevents duplicate categories
    },
    slugField({
      useAsSlug: "name",
    }),
    {
      name: "description",
      type: "textarea",
      admin: {
        placeholder:
          "Brief description of this category of electrical products.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media", // Link to your Media collection for category thumbnails
    },
  ],
};

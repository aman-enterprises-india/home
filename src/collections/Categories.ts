import type { CollectionConfig } from "payload";
import { formatSlug } from "../app/hooks/formatSlug";

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
    {
      name: "slug",
      type: "text", // In Payload 3.0, you can use a hook to auto-generate this
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Used in the URL (e.g., ht-panels)",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
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

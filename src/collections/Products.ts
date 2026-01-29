import { slugField, type CollectionConfig } from "payload";
import { formatSlug } from "../app/hooks/formatSlug";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "price", "updatedAt"],
  },
  access: {
    // Allows the public to view products on your website
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({
      useAsSlug: "title",
    }),
    {
      name: "category",
      type: "relationship",
      relationTo: "categories", // Ensure you create a Categories collection
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "price",
      type: "number",
      admin: {
        description: 'Leave blank to show "Price on Request"',
      },
    },
    {
      name: "description",
      type: "richText", // Uses the modern Lexical editor by default
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media", // Ensure you create a Media collection
          required: true,
        },
      ],
    },
    {
      name: "specifications",
      type: "array",
      label: "Technical Specifications",
      labels: {
        singular: "Specification",
        plural: "Specifications",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g., Voltage",
          },
        },
        {
          name: "value",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g., 440V",
          },
        },
      ],
    },
  ],
};

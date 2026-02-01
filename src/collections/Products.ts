import { slugField, type CollectionConfig } from "payload";

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
      type: "row",
      fields: [
        {
          name: "mrp",
          type: "number",
          label: "MRP (₹)",
          min: 0,
        },
        {
          name: "discount",
          type: "number",
          label: "Discount (%)",
          defaultValue: 0,
          min: 0,
          max: 100,
        },
        {
          name: "price",
          type: "number",
          label: "Current Price (₹)",
          admin: {
            readOnly: true,
            description: "Calculated Automatically from MRP and Discount",
          },
          hooks: {
            beforeValidate: [
              ({ data }) => {
                if (data?.mrp) {
                  const discountAmount =
                    (data.mrp * (data.discount || 0)) / 100;
                  return Math.round(data.mrp - discountAmount);
                }
                return undefined;
              },
            ],
          },
        },
      ],
    },
    {
      name: "description",
      type: "richText", // Uses the modern Lexical editor by default
      required: true,
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

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
          name: "gstRate",
          type: "select",
          label: "GST Rate (%)",
          defaultValue: "18", // Standard for electrical panels
          options: [
            { label: "5%", value: "5" },
            { label: "12%", value: "12" },
            { label: "18%", value: "18" },
            { label: "28%", value: "28" },
          ],
        },
        {
          name: "price",
          type: "number",
          label: "Current Price (₹)",
          admin: {
            readOnly: true,
            description: "Calculated Automatically from MRP, Discount and Gst",
            position: "sidebar",
          },
          hooks: {
            beforeValidate: [
              ({ data }) => {
                if (data?.mrp) {
                  const discount = data.discount || 0;
                  const afterDiscount = data.mrp - (data.mrp * discount) / 100;

                  const gst = parseInt(data.gstRate || "18");
                  const total = afterDiscount + (afterDiscount * gst) / 100;

                  return Math.round(total * 100) / 100;
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

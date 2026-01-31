import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "YouTube or Vimeo URL",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};

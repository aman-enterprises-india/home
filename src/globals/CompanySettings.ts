import type { GlobalConfig } from "payload";

export const CompanySettings: GlobalConfig = {
  slug: "company-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteTitle",
      type: "text",
      required: true,
      defaultValue: "Aman Enterprises",
    },
    {
      name: "GSTNo",
      type: "text",
    },
    {
      name: "contactInfo",
      type: "group", // Groups fields together in the UI
      fields: [
        {
          name: "phone",
          type: "text",
        },
        {
          name: "email",
          type: "text",
        },
        {
          name: "address",
          type: "textarea",
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: ["LinkedIn", "Facebook", "YouTube", "Twitter"],
        },
        {
          name: "url",
          type: "text",
        },
      ],
    },
  ],
};

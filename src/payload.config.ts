import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { Products } from "./collections/Products";
import { Categories } from "./collections/Categories";
import { Videos } from "./collections/Videos";
import { CompanySettings } from "./globals/CompanySettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: "/components/Branding.tsx#Logo",
        Icon: "/components/Branding.tsx#Icon",
      },
    },
    meta: {
      title: "Aman Enterprises",
      titleSuffix: "- Admin",
    },
  },
  collections: [Users, Media, Products, Categories, Videos],
  globals: [CompanySettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ["products", "categories"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `${doc?.title} | Aman Enterprises`,
      generateDescription: ({ doc }) => doc?.description,
      generateURL: ({ doc }) => `localhost:3000/products/${doc?.slug}`,
      tabbedUI: true,
    }),
  ],
});

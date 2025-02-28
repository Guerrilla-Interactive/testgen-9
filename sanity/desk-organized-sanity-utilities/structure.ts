import { settingsStructure } from "@/sanity/desk-organized-sanity-utilities/settings/settings.structure";
import { categoryDeskStructure } from "./category/category.document-structure";
import { authorDeskStructure } from "./author/author.document-structure";
import { faqDeskStructure } from "./faq/faq.document-structure";
import { testimonialDeskStructure } from "./testimonial/testimonial.document-structure";
import { blogSlugDeskStructure } from "@/app/(main)/blog/[slug]/(blog-slug-core-utilities)/blog-slug.desk-structure";

import { serviceSlugDeskStructure } from "@/app/(main)/service/[slug]/(service-slug-core-utilities)/service-slug.desk-structure";
import { courseSlugDeskStructure } from "@/app/(main)/course/[slug]/(course-slug-core-utilities)/course-slug.desk-structure";
// ADD VALUE 1 ABOVE
export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    
    .items([
      settingsStructure(S),
      S.listItem()
      .title("Pages")
      .schemaType("page-slug")
      .child(
        S.documentTypeList("page-slug")
          .title("Pages")
          .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
      ),
      blogSlugDeskStructure(S),
      categoryDeskStructure(S, context),
      authorDeskStructure(S, context),
      faqDeskStructure(S, context),
      testimonialDeskStructure(S, context),
serviceSlugDeskStructure(S),
courseSlugDeskStructure(S),
      // ADD VALUE 2 ABOVE
    ]
    );

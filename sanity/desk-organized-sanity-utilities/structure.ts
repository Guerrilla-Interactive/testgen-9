import { settingsStructure } from "@/sanity/desk-organized-sanity-utilities/settings/settings.structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Files, BookA, User, ListCollapse, Quote } from "lucide-react";
import { categoryDeskStructure } from "./category/category.document-structure";
import { authorDeskStructure } from "./author/author.document-structure";
import { faqDeskStructure } from "./faq/faq.document-structure";
import { testimonialDeskStructure } from "./testimonial/testimonial.document-structure";
import { blogSlugDeskStructure } from "@/app/(main)/blog/[slug]/(blog-slug-core-utilities)/blog-slug.desk-structure";
export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    
    .items([
      settingsStructure(S),
      orderableDocumentListDeskItem({
        type: "page-slug",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      blogSlugDeskStructure(S),
      categoryDeskStructure(S, context),
      authorDeskStructure(S, context),
      faqDeskStructure(S, context),
      testimonialDeskStructure(S, context),
    ]
    );

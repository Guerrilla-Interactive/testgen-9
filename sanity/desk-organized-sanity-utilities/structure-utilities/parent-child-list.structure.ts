import { Info, PlusCircle } from "lucide-react"
import { SanityDocument } from "@sanity/client"
import { StructureBuilder } from "sanity/structure"

type ChildrenList = {
  icon: React.FC<any>
  title: string
  schemaType: string
  filter?: string
  templateId: string
}

export const parentChildList = (
  S: StructureBuilder,
  title = "Aktive prosjekter",
  schemaType: string,
  filter: string,
  childrenList: ChildrenList[],
  icon?: React.FC<any>
) => {
  const generateChildrensList = (parentId: string, lists: ChildrenList[]) => {
    if (!parentId || !lists) return []
    return lists.map((child) => {
      return S.listItem()
        .title(child.title)
        .icon(child.icon)
        .child(
          S.documentTypeList(child.schemaType)
            .title(child.title)
            .filter(
              child?.filter ??
                `_type == "${child.schemaType}" && references("${parentId}")`
            )
            .initialValueTemplates([
              S.initialValueTemplateItem(child.templateId, {
                parentId: parentId
              })
            ])
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        )
    })
  }

  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList(schemaType)
        .title(title)
        .filter(filter)
        .child((parentId: string) =>
          S.list()
            .title(title)
            .items([
              S.listItem()
                .title("Info")
                .icon(Info)
                .child(
                  S.document().documentId(parentId).schemaType(schemaType)
                ),

              S.divider(),
              ...generateChildrensList(parentId, childrenList)
            ])
        )
    )
}

import { Icon } from "lucide-react"
import { StructureBuilder } from "sanity/structure"


type DocumentListProps = {
  S: StructureBuilder
  type: string
  title: string
  id?: string
  icon: typeof Icon
}

export const documentList  = ({
  S,
  type,
  title,
  id,
  icon
}: DocumentListProps) => {
  if (typeof type == "undefined") return

  const intentChecker = S.documentTypeList(type).getCanHandleIntent()

  if (intentChecker == undefined) return

  return (
    S.listItem()
      .title(title)
      .icon(icon)
      .child(
        S.documentList()
          .apiVersion("v2023-08-01")
          .title(title)
          .id(type)
          .schemaType(type)
          .filter(`_type == "${type}"`)
          .canHandleIntent(intentChecker)
      )
  )
}

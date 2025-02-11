import { stegaClean } from "next-sanity";
import SectionContainer from "@/features/ui/section-container";

interface Hero3Props {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  title: string;
}

export default async function Hero3BlockComponent(props: Partial<Hero3Props>) {

const color = stegaClean(props.colorVariant);
  return (
    <SectionContainer color={color} padding={props.padding}>
      <h1>{props.title}</h1>
    </SectionContainer>
  );
}

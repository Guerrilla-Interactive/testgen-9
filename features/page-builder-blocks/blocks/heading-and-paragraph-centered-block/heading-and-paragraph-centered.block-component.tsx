import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import RepeatingSvgBanner from "./repeating-svg-banner";
interface HeadingAndParagraphCenteredProps {
  heading: string;
  paragraph: string;
}

export default async function HeadingAndParagraphCenteredBlockComponent(props:
Partial<HeadingAndParagraphCenteredProps>) {
  

  return (
    <>
      <RepeatingSvgBanner />
      <Section className="py-20">
        <Container className="text-center items-center gap-y-6 max-w-screen-md">
          <h2 className=" font-semibold max-w-[550px] text-5xl tracking-wider">{props.heading}</h2>
          <p className="text-lg">{props.paragraph}</p>
        </Container>

      </Section>
    </>
  )
}



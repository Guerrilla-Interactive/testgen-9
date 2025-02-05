import AllPosts from "./ui/all-posts/all-posts.component";
import Carousel1 from "./ui/carousel/carousel-1/carousel-1.component";
import Carousel2 from "./ui/carousel/carousel-2/carousel-2.component";
import Cta1 from "./ui/cta/cta-1/cta-1.component";
import FAQs from "./ui/faqs/faqs.component";
import FormNewsletter from "./ui/forms/newsletter/newsletter.component";
import GridRow from "./ui/grid/grid-row/grid-row.component";
import Hero1 from "./ui/hero/hero-1/hero-1.component";
import Hero2 from "./ui/hero/hero-2/hero-2.component";
import LogoCloud1 from "./ui/logo-cloud/logo-cloud-1.component";
import SectionHeader from "./ui/section-header/section-header.component";
import SplitRow from "./ui/split/split-row/split-row.component";
import TimelineRow from "./ui/timeline/timeline-row/timeline-row.component";




const componentMap: { [key: string]: React.ComponentType<any> } = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
};

export default function Blocks({ blocks }: { blocks?: Sanity.Block[] }) {
  return (
    <>
      {blocks?.map((block: Sanity.Block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for unknown block types to debug
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...block} key={block._key} />;
      })}
    </>
  );
}

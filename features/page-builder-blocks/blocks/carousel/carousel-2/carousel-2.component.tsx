import { stegaClean } from "next-sanity";

import { urlFor } from "@/sanity/lib/image";
import SectionContainer from "@/features/ui/section-container";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/ui/carousel";
import { Card, CardContent } from "@/features/ui/card";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { StarRating } from "@/features/ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";


interface Carousel2Props {
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
  testimonial: {
    _id: string;
    name: string;
    title: string;
    image: Sanity.Image;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body: any;
    rating: number;
  }[];
}

export default function Carousel2BlockComponent({
  padding,
  colorVariant,
  testimonial,
}: Partial<Carousel2Props>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {testimonial && testimonial.length > 0 && (
        <Carousel>
          <CarouselContent>
            {testimonial.map((item) => (
              <CarouselItem
                key={item._id}
                className="pl-2 md:pl-4 md:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    <div>
                      <div className="flex items-center mb-2">
                        <Avatar className="w-10 h-10 mr-3">
                          {item.image && (
                            <AvatarImage
                              src={urlFor(item.image.asset).url()}
                              alt={item.name}
                            />
                          )}
                          <AvatarFallback>
                            {item.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={item.rating} />
                      {item.body && (
                        <div className="text-sm mt-2 line-clamp-4">
                          <PortableTextRenderer value={item.body} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="-left-3 md:-left-8 xl:-left-12"
          />
          <CarouselNext
            variant="secondary"
            className="-right-3 md:-right-8 xl:-right-12"
          />
          <div className="w-full flex justify-center">
            <CarouselDots />
          </div>
        </Carousel>
      )}
    </SectionContainer>
  );
} 
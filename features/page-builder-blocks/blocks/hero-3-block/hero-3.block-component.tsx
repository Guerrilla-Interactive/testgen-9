import { Img, type ImageQuery } from "@/features/unorganized-components/image-component/image.component";

interface Hero3Props {
  backgroundImage?: ImageQuery;
  titleOrange?: string;
  titleWhite?: string;
  subtitle?: string;
}

export default async function Hero3BlockComponent(props: Partial<Hero3Props>) {
  const { backgroundImage, titleOrange, titleWhite, subtitle } = props;

  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
      {backgroundImage && (
        <Img
          {...backgroundImage}
          cover

          className="absolute inset-0 w-full h-full object-cover "
          sizes={{ md: "full" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      {/* Content Section: Title Bottom-Left, Subtitle Bottom-Right */}
      <div className="absolute container  bottom-0 inset-x-0 flex flex-col md:flex-row justify-between md:items-end pb-4 md:pb-8">
        {/* Left: Title */}
        <div className="text-left">
          {(titleOrange || titleWhite) && (
            <h1 className="text-white text-3xl uppercase font-title font-extrabold sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
              {titleOrange && <span className="block text-orange-500">{titleOrange}</span>}
              {titleWhite && <span className="block">{titleWhite}</span>}
            </h1>
          )}
        </div>
        {/* Right: Subtitle */}
        <div className="">
          {subtitle && (
            <p className="mt-2 md:mt-0 text-sm sm:text-base md:text-xl max-w-96 lg:text-2xl  text-white drop-shadow-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

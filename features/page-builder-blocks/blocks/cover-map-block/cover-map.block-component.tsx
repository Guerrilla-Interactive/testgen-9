import { CoverMapBlock } from "@/sanity.types";
import MapboxMapCover, { MapboxMapCoverProps } from "./cover-map-block-components/mapbox-cover.component";


// make a fusion of CoverMapBlock and MapboxMapCoverProps as partial
interface CoverMapProps extends Partial<MapboxMapCoverProps & CoverMapBlock> {}


export default async function CoverMapBlockComponent(props: CoverMapProps) {
  const {
    center = { lat: 40, lng: -74.5 },
    zoom = 7.5,
    animateIntro = {
      enabled: false,
      initialZoom: zoom + 4.5,
      initialPitch: 120,
      duration: 3000,
    },
    bearingRotation = {
      enabled: true,
      speed: 0.005,
      introDelay: animateIntro.enabled ? animateIntro.duration : 0,
      },
    radiusAnimation = {
      enabled: true,
      duration: 20000,
      spawnInterval: 8000,
      radius: 160,
      opacity: {
        startOpacity: 0.2,
        endOpacity: 0,
      },
      color: "#FFA500",
      introDelay: animateIntro.enabled ? animateIntro.duration : 0,
    },  
  } = props;


  return (
    <>
      <div className="h-[500px] w-full">
        <MapboxMapCover center={center} zoom={zoom} animateIntro={animateIntro} bearingRotation={bearingRotation} radiusAnimation={radiusAnimation} />
      </div>
      </>
  );
}

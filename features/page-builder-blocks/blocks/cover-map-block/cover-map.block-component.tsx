import MapboxMapCover from "./cover-map-block-components/mapbox-cover.component";



interface CoverMapProps {
  backgroundColor?: string;
  padding?: string;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

export default async function CoverMapBlockComponent(props: Partial<CoverMapProps>) {
  // Provide default values if not supplied
  const {
    center = { lat: 40, lng: -74.5 },
    zoom = 9,
  } = props;

  // Mapbox expects center as [lng, lat]
  const mapCenter: [number, number] = [center.lng, center.lat];

  // Declare animationFrameId in the parent scope so it is accessible in cleanup
  let animationFrameId: number;

  return (
    <>
      <div className="h-[500px] w-full mt-16">
        <MapboxMapCover center={mapCenter} zoom={zoom} />
      </div>
      </>
  );
}

"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapCoverProps {
  center: [number, number];
  zoom: number;
  mapStyle?: string;
  theme?: "dark" | "light";
}

const MapboxMapCover: React.FC<MapboxMapCoverProps> = ({
  center,
  zoom,
  mapStyle,
  theme = "light",
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  // Use the provided mapStyle, or select one based on the theme.
  const computedMapStyle =
    mapStyle || (theme === "light"
      ? "mapbox://styles/mapbox/light-v10"
      : "mapbox://styles/mapbox/dark-v10");

  useEffect(() => {
    // Set the Mapbox access token if not already set.
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken =
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
        "pk.eyJ1IjoiZnJpa2siLCJhIjoiY2s4ZjN5eHRkMDBjMTNsbnp6dWVpbXlqbSJ9.76Bp2Hb2cnEWJlcuYOxGzw";
    }

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: computedMapStyle,
        center: center,
        zoom: zoom,
        pitch: 70,
        bearing: -17.6,
      });

      // Disable interactive controls for a static cover view.
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.dragRotate.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();

      let animationFrameId: number;

      map.on("load", () => {
        // Conditionally style the popup depending on theme
        const popupContent =
          theme === "dark"
            ? `
            <div
              class="p-4 bg-gray-900 rounded-lg shadow-md text-sm font-sans space-y-2 text-gray-100"
              style="min-width: 200px; "
            >
              
              <p>
                <span class="font-medium">E-post:</span>
                <a href="mailto:info@veitrygghet.no" class="underline">
                  info@veitrygghet.no
                </a>
              </p>
              <p><span class="font-medium">Adresse:</span> Bølerveien 84, 2020 Skedsmokorset</p>
              <p class="font-sans>
                <span class="font-medium">Telefon:</span>
                <a href="tel:+4722300200" class="underline">
                  +47 22 300 200
                </a>
              </p>
              <p><span class="font-medium">Org.nr:</span> 928 409 074</p>
            </div>
            `
            : `
            <div
              class="p-4  rounded-lg  text-sm space-y-2 text-gray-800"
              style="min-width: 200px;"
            >
              
              <p>
                <span class="font-medium">E-post:</span>
                <a href="mailto:info@veitrygghet.no" class="underline text-blue-600">
                  info@veitrygghet.no
                </a>
              </p>
              <p><span class="font-medium">Adresse:</span> Bølerveien 84, 2020 Skedsmokorset</p>
              <p>
                <span class="font-medium">Telefon:</span>
                <a href="tel:+4722300200" class="underline text-blue-600">
                  +47 22 300 200
                </a>
              </p>
              <p><span class="font-medium">Org.nr:</span> 928 409 074</p>
            </div>
            `;

        // Create a popup that is open by default
        const popup = new mapboxgl.Popup({
          closeOnClick: false,
          closeButton: true,
          anchor: "left",
          offset: 25,
        })
          .setLngLat(center)
          .setHTML(popupContent);

        // Add a marker at the center with an orange color (#FFA500) and attach the popup
        const marker = new mapboxgl.Marker({ color: "#FFA500" })
          .setLngLat(center)
          .setPopup(popup)
          .addTo(map);

        // By default, popups only open on click. We open it right away:
        marker.togglePopup();

        // Update road layers only when using the dark theme.
        if (theme === "dark") {
          const layers = map.getStyle()?.layers;
          if (layers) {
            layers.forEach((layer) => {
              if (
                layer.type === "line" &&
                layer.id?.toLowerCase().includes("road")
              ) {
                try {
                  map.setPaintProperty(layer.id, "line-color", "#1b1b1b");
                } catch (error) {
                  console.error(`Failed to update layer ${layer.id}:`, error);
                }
              }
            });
          }
        }

        // Add a 3D buildings layer for a cool 3D effect.
        const styleLayers = map.getStyle()?.layers;
        let labelLayerId: string | undefined;
        if (styleLayers) {
          for (const layer of styleLayers) {
            if (
              layer.type === "symbol" &&
              layer.layout &&
              (layer.layout as any)["text-field"]
            ) {
              labelLayerId = layer.id;
              break;
            }
          }
        }

        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );

        // Start continuous rotation around the marker
        function rotateMap() {
          map.rotateTo(map.getBearing() + 0.01, { duration: 0 });
          animationFrameId = requestAnimationFrame(rotateMap);
        }
        rotateMap();
      });

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        map.remove();
      };
    }
  }, [center, zoom, computedMapStyle, theme]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapboxMapCover;

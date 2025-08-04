import { useRef, useEffect } from "react";
import MapOL from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import "./Map.css";
import "ol/ol.css";
import type { MapProps } from "../../../type";

const Map = (props: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { center, zoom } = props;

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new MapOL({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    map.updateSize();

    return () => {
      map.setTarget(undefined);
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;

import React, { useEffect, useState } from 'react';
import { Layer, RasterLayer, Source } from 'react-map-gl';
import { useMapStore } from '@/models/useMapStore';
import { WindLayer } from '@sakitam-gis/mapbox-wind';

// const DataFile = '../../../public/data/bornData_16_AIEarth.json';
const DataFile = 'https://blog.sakitam.com/wind-layer/data/wind.json';

const WaterLayer = (props) => {
  const [data, setData] = useState<any>();
  const { map } = useMapStore();

  const init = async () => {
    try {
      const response = await fetch(DataFile);
      const data = await response.json();
      console.log(data);

      const windLayer = new WindLayer('wind', data, {
        windOptions: {
          colorScale: [
            'rgb(36,104, 180)',
            'rgb(60,157, 194)',
            'rgb(128,205,193 )',
            'rgb(151,218,168 )',
            'rgb(198,231,181)',
            'rgb(238,247,217)',
            'rgb(255,238,159)',
            'rgb(252,217,125)',
            'rgb(255,182,100)',
            'rgb(252,150,75)',
            'rgb(250,112,52)',
            'rgb(245,64,32)',
            'rgb(237,45,28)',
            'rgb(220,24,32)',
            'rgb(180,0,35)',
          ],
          // velocityScale: 1 / 20,
          // paths: 5000,
          frameRate: 16,
          maxAge: 60,
          globalAlpha: 0.9,
          velocityScale: 0.01,
          // velocityScale: () => {
          // 	const zoom = map.getZoom();
          // 	return velocityScales[zoom] || 0.01
          // },
          // paths: 10000,
          paths: 3782,
        },
        fieldOptions: {
          wrapX: true,
        },
      });
      console.log(map, windLayer);
      // map.addLayer(windLayer);
      windLayer.addTo(map);

      // setData(geojson);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    map && init();
  }, [map]);

  return (
    <>
      {/* <Source id="water"> */}
      {/* <Layer {...waterLayer} /> */}
      {/* </Source> */}
    </>
  );
};
export default WaterLayer;

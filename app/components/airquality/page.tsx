import React from 'react';
import Head from 'next/head';

const Airquality = () => {
  return (
    <>
      <Head>
        <title>ArcGIS Map Viewer</title>
        <meta name="description" content="Map viewer using ArcGIS" />
      </Head>
      <div style={{ width: '100vw', height: '100vh' }}>
        <iframe
          src="https://www.arcgis.com/apps/mapviewer/index.html?webmap=a28d5ccc504c4b129d4b42cad48c8f96"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Airquality;

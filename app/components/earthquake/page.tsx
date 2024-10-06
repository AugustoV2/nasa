import React from 'react';
import Head from 'next/head';

const Earthquake = () => {
  return (
    <>
      <Head>
        <title>ArcGIS Map Viewer</title>
        <meta name="description" content="Map viewer using ArcGIS" />
      </Head>
      <div style={{ width: '100vw', height: '100vh' }}>
        <iframe
          src="https://www.arcgis.com/apps/mapviewer/index.html?webmap=249bbba191704b0088d04f81a6405912"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Earthquake;

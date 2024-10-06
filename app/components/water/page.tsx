import React from 'react';
import Head from 'next/head';

const Temperature = () => {
  return (
    <>  
      <Head>
        <title>ArcGIS Map Viewer</title>
        <meta name="description" content="Map viewer using ArcGIS" />
      </Head>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <iframe
          src="https://livingatlas.arcgis.com/waterbalance/"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        
        {/* Navbar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          backgroundColor: '#ffffff', // Full white
          zIndex: 1000, // Ensure the navbar is above the iframe
        }}>
          <h1 style={{ margin: 0, fontSize: '20px', color: 'black' }}>Water Quality</h1>
        </div>
        
        {/* Sidebar */}
        <div style={{
          position: 'absolute',
          top: '50px', // Below the navbar
          left: 0,
          width: '55px', // Sidebar width
          height: 'calc(100% - 50px)', // Full height minus navbar
          backgroundColor: '#ffffff', // Semi-transparent white
         
          zIndex: 1000,
          padding: '10px',
        }}>
          
          
        </div>
      </div>
    </>
  );
};

export default Temperature;

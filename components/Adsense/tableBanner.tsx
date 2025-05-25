// // components/Adsense/tableBanner.tsx
// import React, { useEffect } from "react";

// interface TableBannerProps {
//   adSlot?: string;
//   adClient?: string;
// }

// declare global {
//   interface Window {
//     adsbygoogle: any[];
//   }
// }

// const TableBanner: React.FC<TableBannerProps> = ({
//   adSlot = "8279758421",
//   adClient = "ca-pub-4870864326886980"
// }) => {
//   useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (error) {
//       console.error("Error loading Google AdSense ads:", error);
//     }
//   }, []);

//   return (
//     <div className="ad-container">
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block", textAlign: "center" }}
//         data-ad-layout="in-article"
//         data-ad-format="fluid"
//         data-ad-client={adClient}
//         data-ad-slot={adSlot}
//       />
//     </div>
//   );
// };

// export default TableBanner;


import React, { useEffect, useRef } from 'react';

interface TableBannerProps {
  adSlot: string;
  adClient?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const TableBanner: React.FC<TableBannerProps> = ({
  adSlot,
  adClient = "ca-pub-4870864326886980"
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current && !adLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      } catch (error) {
        console.error("Error loading Google AdSense ad:", error);
      }
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default TableBanner;
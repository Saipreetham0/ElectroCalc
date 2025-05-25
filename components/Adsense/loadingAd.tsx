// components/Adsense/loadingAd.tsx

// import React, { useEffect } from "react";

// interface LoadingAdProps {
//   adSlot: string;
//   adClient?: string;
// }

// declare global {
//   interface Window {
//     adsbygoogle: any[];
//   }
// }

// const LoadingAd: React.FC<LoadingAdProps> = ({
//   adSlot,
//   adClient = "ca-pub-4870864326886980",
// }) => {
//   useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (error) {
//       console.error("Error loading Google AdSense ads:", error);
//     }
//   }, []);

//   return (
//     <div className="ads-container">
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client={adClient}
//         data-ad-slot={adSlot}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       />
//     </div>
//   );
// };

// export default LoadingAd;

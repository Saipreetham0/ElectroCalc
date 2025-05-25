// components/Adsense/AdBanner.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  publisherId?: string;
}

// Define the structure for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  publisherId = "ca-pub-4870864326886980",
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    // Check if we're in the browser and the ad hasn't been loaded yet
    if (typeof window === "undefined" || !adRef.current || adLoaded.current) {
      return;
    }

    try {
      // Initialize adsbygoogle array if it doesn't exist
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      // Push the ad configuration
      window.adsbygoogle.push({});

      adLoaded.current = true;
    } catch (error) {
      console.error("Error loading Google AdSense ad:", error);

      // Optional: Implement retry logic
      const retryTimeout = setTimeout(() => {
        adLoaded.current = false;
      }, 5000);

      // Cleanup timeout on component unmount
      return () => clearTimeout(retryTimeout);
    }
  }, [publisherId]);

  // Merge provided className with default styles
  const adStyles = `adsbygoogle ${className}`.trim();

  return (
    <div className="ad-container ">
      <ins
        ref={adRef}
        className={adStyles}
        style={{
          display: "block",
          textAlign: "center",
          minHeight: "50px",
        }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        aria-label="Advertisement"
      />
    </div>
  );
};

export default AdBanner;

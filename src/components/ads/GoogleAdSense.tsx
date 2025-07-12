import Script from "next/script";
import { FunctionComponent } from "react";

export const GoogleAdSense: FunctionComponent = () => {
  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-5459038929652352",
              enable_page_level_ads: true
            });
          `,
        }}
      />
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5459038929652352`}
        strategy="afterInteractive"
        crossOrigin='anonymous'
      />
    </>
  );
};

import Script from "next/script";
import { FunctionComponent } from "react";

export const GoogleAdSense: FunctionComponent = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5459038929652352`}
      crossOrigin='anonymous'
    />
  );
};

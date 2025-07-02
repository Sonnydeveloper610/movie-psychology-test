import React, { useEffect, useRef } from "react";

export default function KakaoAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) adRef.current.innerHTML = "";

    const isPC = window.matchMedia("(min-width: 728px)").matches;
    const adUnit = isPC
      ? { unit: "DAN-NOAbzxQGMUQ8Mke7", width: 728, height: 90 }
      : { unit: "DAN-gNGXA6EnAXz8usSK", width: 320, height: 100 };

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", adUnit.unit);
    ins.setAttribute("data-ad-width", adUnit.width);
    ins.setAttribute("data-ad-height", adUnit.height);

    adRef.current.appendChild(ins);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) adRef.current.innerHTML = "";
    };
  }, []);

  return (
    <>
      <div ref={adRef} style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "24px" }} />
      <style>{`
        .kakao_ad_area {
          width: 100%;
          max-width: 728px;
          min-width: 320px;
          height: auto;
        }
      `}</style>
    </>
  );
}

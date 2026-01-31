import { useEffect, useState } from "react";

export function useAppbarHeight() {
  const [appbarHeight, setAppbarHeight] = useState(0);

  useEffect(() => {
    const appBar = document.querySelector("header.MuiAppBar-root");
    setAppbarHeight(appBar?.clientHeight || 0);

    function handleResize() {
      setAppbarHeight(appBar?.clientHeight || 0);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return appbarHeight;
}

export const centToEur = (cents) => {
  return (Number(cents) / 100).toLocaleString('de-DE') + "€";
};

import React from "react";

export default function useFullscreenStatus(elRef): [boolean, ()=>void] {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const switchFullscreen = () => {
    if (elRef.current == null) return;

    if(isFullscreen)
        document.exitFullscreen();
    else
        elRef.current
        .requestFullscreen()
        .then(() => {
            setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
        })
        .catch(() => {
            setIsFullscreen(false);
        });
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

    return () => (document.onfullscreenchange = undefined);
  });

  return [isFullscreen, switchFullscreen];
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } 
  // else if (typeof document.mozFullScreenElement !== "undefined") {
  //   return "mozFullScreenElement";
  // } else if (typeof document.msFullscreenElement !== "undefined") {
  //   return "msFullscreenElement";
  // } else if (typeof document.webkitFullscreenElement !== "undefined") {
  //   return "webkitFullscreenElement";
  // }
  else {
    throw new Error("fullscreenElement is not supported by this browser");
  }
}
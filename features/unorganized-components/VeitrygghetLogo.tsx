
import React, { useRef, useEffect, useState } from "react";
import anime, { AnimeTimelineAnimParams, EasingOptions, DirectionOptions } from "animejs";


type TargetKeyframe = number | "first" | "last";



/**
 * Props for the VeitrygghetLogo component.
 */
interface VeitrygghetLogoProps {
  className?: string;
  hoverFrame?: TargetKeyframe;
  clickFrame?: TargetKeyframe;
  /**
   * It will freeze at this keyframe.
   * - ActiveKeyframe will cancel the loop.
   * - If ActiveKeyframe is changed, it will seek to the new keyframe automatically.
   * - ActiveKeyframe will animate to the new keyframe in the speed of the duration.
   *
   * @default "first"
   * @example
   * <VeitrygghetLogo activeKeyframe="first" />
   * <VeitrygghetLogo duration={100} activeKeyframe={darkMode ? "first" : "last"} />
   * <VeitrygghetLogo activeKeyframe={0} />
   */
  activeKeyframe?: TargetKeyframe;
  loop?: boolean;
  /**
   * The duration of the animation.
   * @default 1000
   * @example
   * <VeitrygghetLogo duration={100} activeKeyframe={darkMode ? "first" : "last"} />
   */
  duration?: number;
  ease?: EasingOptions;
  direction?: DirectionOptions;
}

/**
 * Keyframe structure.
 */
interface Keyframe {
  viewBox: string;
  paths: {
    d: string;
    stroke: string;
    strokeWidth: number;
    fill: string;
    strokeLinecap: string;
    strokeLinejoin: string;
  }[];
  keyframeFilter?: Record<string, any>;
}

const keyframes: Keyframe[] = [
{
  "id": "keyframe-1741602100386",
  "viewBox": "0 0 336 31",
  "paths": [
    {
      "d": "M0 0.779144L14.7307 30.9497L18.3169 24.1033L8.21244 0.779144H0Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M16.1016 13.0546L19.6878 20.8712L29.4677 0.779297H21.3669L16.1016 13.0546Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M45.0084 0.779297H36.6641V29.7234H45.0084V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M72.774 0.779297H64.4297V29.7234H72.774V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M96.6938 0.779297H88.9023V29.7234H96.6938V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M257.569 12.6025H249.453V29.7237H257.569V12.6025Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M257.569 0.779297H249.453V10.2447H257.569V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M267.446 17.9004H275.562V0.779259H267.446V17.9004Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M275.562 19.5797V12.6025L249.454 12.6025V19.5797H275.562Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M267.446 29.7236H275.562V21.9372H267.446V29.7236Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M57.2265 0.779297H47.2539V7.23868H57.2265V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M86.0343 0.779297H79.9727V7.82178H86.0343V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M105.529 0.779297H94.0547V7.82178H105.529V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M327.17 0.779297H319.379V29.7234H327.17V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M316.511 0.779297H310.449V7.82178H316.511V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M336.001 0.779297H324.527V7.82178H336.001V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M57.2265 23.2637H47.2539V29.7231H57.2265V23.2637Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M55.5177 12.6377H42.9023V18.5793H55.5177V12.6377Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M291.028 0.779297H282.684V29.7234H291.028V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M303.246 0.779297H293.273V7.23868H303.246V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M303.246 23.2637H293.273V29.7231H303.246V23.2637Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M301.537 12.6377H288.922V18.5793H301.537V12.6377Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M120.514 9.56641H112.723V29.7237H120.514V9.56641Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M136.098 10.9634C136.098 13.7633 135.231 16.3118 133.369 18.1566C132.563 18.9559 131.625 19.6295 130.595 20.1271C129.24 20.7806 127.724 21.1526 126.121 21.1526H123.194V15.4874H123.828C124.675 15.4874 125.461 15.2311 126.126 14.8038C126.369 14.6429 126.598 14.462 126.801 14.2609C127.566 13.5069 128.038 12.4714 128.038 11.3253C128.038 9.03309 126.146 7.15308 123.828 7.15308H112.734V0.78418H124.756C130.402 0.78418 136.098 5.36355 136.098 10.9634Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M136.924 29.7232H127.879L123.187 21.7759V15.4824H123.821C124.668 15.4824 125.455 15.226 126.119 14.7988L127.732 16.2465L130.274 19.6395L130.588 20.1221L136.924 29.7182V29.7232Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M141.715 0.779297L152.961 20.0318L160.737 21.9218L150.566 0.779297H141.715Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M158.293 10.9635L161.859 18.192L172.08 0.784324L163.081 0.779297L158.293 10.9635Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M154.721 18.6289L152.961 20.0314V29.723H160.737V21.9214L154.721 18.6289Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M185.362 15.5831C185.362 11.1344 189.196 7.52017 193.919 7.52017C196.268 7.52017 198.393 8.40488 199.94 9.85258L204.424 4.13716C201.523 1.56346 197.632 -0.00488281 193.356 -0.00488281C184.367 -0.00488281 177.078 6.93204 177.078 15.4976C177.078 24.0632 184.367 30.9951 193.356 30.9951C194.477 30.9951 195.568 30.8845 196.633 30.6784V23.2288C195.781 23.5002 194.862 23.646 193.919 23.646C189.196 23.646 185.362 20.0318 185.362 15.5781V15.5831Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M202.101 13.2158H192.047V18.509H198.991V30.0454C201.791 29.0602 204.231 27.3611 206.062 25.1845V13.2158H202.096H202.101Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M221.549 15.5831C221.549 11.1344 225.384 7.52017 230.106 7.52017C232.455 7.52017 234.58 8.40488 236.128 9.85258L240.612 4.13716C237.71 1.56346 233.82 -0.00488281 229.543 -0.00488281C220.555 -0.00488281 213.266 6.93204 213.266 15.4976C213.266 24.0632 220.555 30.9951 229.543 30.9951C230.664 30.9951 231.755 30.8845 232.82 30.6784V23.2288C231.968 23.5002 231.05 23.646 230.106 23.646C225.384 23.646 221.549 20.0318 221.549 15.5781V15.5831Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    },
    {
      "d": "M238.288 13.2158H228.234V18.509H235.179V30.0454C237.979 29.0602 240.419 27.3611 242.25 25.1845V13.2158H238.283H238.288Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(0, 0, 0, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(0, 0, 0, 1)"
    }
  ],
  "keyframeFilter": {
    "hue": -16
  }
},
{
  "id": "keyframe-1741602085137",
  "viewBox": "0 0 336 31",
  "paths": [
    {
      "d": "M0 0.779144L14.7307 30.9497L18.3169 24.1033L8.21244 0.779144H0Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M16.1016 13.0546L19.6878 20.8712L29.4677 0.779297H21.3669L16.1016 13.0546Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M45.0084 0.779297H36.6641V29.7234H45.0084V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M72.774 0.779297H64.4297V29.7234H72.774V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M96.6938 0.779297H88.9023V29.7234H96.6938V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M257.569 12.6025H249.453V29.7237H257.569V12.6025Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M257.569 0.779297H249.453V10.2447H257.569V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M267.446 17.9004H275.562V0.779259H267.446V17.9004Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M275.562 19.5797V12.6025L249.454 12.6025V19.5797H275.562Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M267.446 29.7236H275.562V21.9372H267.446V29.7236Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M57.2265 0.779297H47.2539V7.23868H57.2265V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M86.0343 0.779297H79.9727V7.82178H86.0343V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M105.529 0.779297H94.0547V7.82178H105.529V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M327.17 0.779297H319.379V29.7234H327.17V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M316.511 0.779297H310.449V7.82178H316.511V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M336.001 0.779297H324.527V7.82178H336.001V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M57.2265 23.2637H47.2539V29.7231H57.2265V23.2637Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M55.5177 12.6377H42.9023V18.5793H55.5177V12.6377Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(215, 107, 1, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(215, 107, 1, 1)"
    },
    {
      "d": "M291.028 0.779297H282.684V29.7234H291.028V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M303.246 0.779297H293.273V7.23868H303.246V0.779297Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M303.246 23.2637H293.273V29.7231H303.246V23.2637Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M301.537 12.6377H288.922V18.5793H301.537V12.6377Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M120.514 9.56641H112.723V29.7237H120.514V9.56641Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M136.098 10.9634C136.098 13.7633 135.231 16.3118 133.369 18.1566C132.563 18.9559 131.625 19.6295 130.595 20.1271C129.24 20.7806 127.724 21.1526 126.121 21.1526H123.194V15.4874H123.828C124.675 15.4874 125.461 15.2311 126.126 14.8038C126.369 14.6429 126.598 14.462 126.801 14.2609C127.566 13.5069 128.038 12.4714 128.038 11.3253C128.038 9.03309 126.146 7.15308 123.828 7.15308H112.734V0.78418H124.756C130.402 0.78418 136.098 5.36355 136.098 10.9634Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M136.924 29.7232H127.879L123.187 21.7759V15.4824H123.821C124.668 15.4824 125.455 15.226 126.119 14.7988L127.732 16.2465L130.274 19.6395L130.588 20.1221L136.924 29.7182V29.7232Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M141.715 0.779297L152.961 20.0318L160.737 21.9218L150.566 0.779297H141.715Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M158.293 10.9635L161.859 18.192L172.08 0.784324L163.081 0.779297L158.293 10.9635Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M154.721 18.6289L152.961 20.0314V29.723H160.737V21.9214L154.721 18.6289Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M185.362 15.5831C185.362 11.1344 189.196 7.52017 193.919 7.52017C196.268 7.52017 198.393 8.40488 199.94 9.85258L204.424 4.13716C201.523 1.56346 197.632 -0.00488281 193.356 -0.00488281C184.367 -0.00488281 177.078 6.93204 177.078 15.4976C177.078 24.0632 184.367 30.9951 193.356 30.9951C194.477 30.9951 195.568 30.8845 196.633 30.6784V23.2288C195.781 23.5002 194.862 23.646 193.919 23.646C189.196 23.646 185.362 20.0318 185.362 15.5781V15.5831Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M202.101 13.2158H192.047V18.509H198.991V30.0454C201.791 29.0602 204.231 27.3611 206.062 25.1845V13.2158H202.096H202.101Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M221.549 15.5831C221.549 11.1344 225.384 7.52017 230.106 7.52017C232.455 7.52017 234.58 8.40488 236.128 9.85258L240.612 4.13716C237.71 1.56346 233.82 -0.00488281 229.543 -0.00488281C220.555 -0.00488281 213.266 6.93204 213.266 15.4976C213.266 24.0632 220.555 30.9951 229.543 30.9951C230.664 30.9951 231.755 30.8845 232.82 30.6784V23.2288C231.968 23.5002 231.05 23.646 230.106 23.646C225.384 23.646 221.549 20.0318 221.549 15.5781V15.5831Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    },
    {
      "d": "M238.288 13.2158H228.234V18.509H235.179V30.0454C237.979 29.0602 240.419 27.3611 242.25 25.1845V13.2158H238.283H238.288Z",
      "stroke": "rgba(0, 0, 0, 0)",
      "strokeWidth": 1,
      "fill": "rgba(255, 255, 255, 1)",
      "strokeLinecap": "inherit",
      "strokeLinejoin": "inherit",
      "transform": "",
      "fillRule": "nonzero",
      "id": "",
      "originalStroke": "rgba(0, 0, 0, 0)",
      "originalFill": "rgba(255, 255, 255, 1)"
    }
  ],
  "keyframeFilter": {}
}
];

const VeitrygghetLogo: React.FC<VeitrygghetLogoProps> = ({
  className,
  activeKeyframe,
  hoverFrame,
  clickFrame,
  loop = true,
  duration = 1000,
  ease = "linear",
  direction = "alternate",
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isSVGHovered, setIsSVGHovered] = useState(false);
  const [isSVGClicked, setIsSVGClicked] = useState(false);

  useEffect(() => {
    if (isSVGHovered) {
      setIsSVGHovered(true);
    } else {
      setIsSVGHovered(false);
    }
    if (isSVGClicked) {
      setIsSVGClicked(true);
    } else {
      setIsSVGClicked(false);
    }
  }, [isSVGHovered, isSVGClicked]);
  // We'll store the timeline instance so we can later update its progress.
  const timelineRef = useRef<AnimeTimelineAnimParams | null>(null);

  // Convert activeKeyframe to a numeric index.
  const activeKeyframeNumber =
    activeKeyframe === "first"
      ? 0
      : activeKeyframe === "last"
      ? keyframes.length - 1
      : activeKeyframe;

  // Create the timeline once.
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      console.error("SVG element not found.");
      return;
    }
    const paths = svgElement.querySelectorAll("path");
    if (keyframes.length < 2 || paths.length === 0) {
      console.error("Insufficient keyframes or no paths found in SVG.");
      return;
    }
  
    const timelineInstance = anime.timeline({
      easing: ease,
      duration: duration,
      loop: activeKeyframe === undefined ? loop : false,
      direction: direction,
      autoplay: true,
    }) as AnimeTimelineAnimParams;
  
    keyframes.forEach((keyframe, index) => {
      if (index === keyframes.length - 1) return;
      keyframe.paths.forEach((path, pathIndex) => {
        const nextFrame = keyframes[index + 1];
        const nextPath = nextFrame.paths[pathIndex];
        timelineInstance.add(
          {
            targets: paths[pathIndex],
            d: { value: nextPath.d },
            fill: { value: nextPath.fill },
          },
          index * duration
        );
      });
    });
  
    // If an activeKeyframe is provided at mount, seek to it and pause.
    if (activeKeyframe !== undefined) {
      const initialTime = activeKeyframe === "first" ? 0 : (keyframes.length - 1) * duration;
      timelineInstance.seek(initialTime);
      timelineInstance.pause();
    }
  
    timelineRef.current = timelineInstance;
  
    // Cleanup: pause the timeline when the component unmounts.
    return () => {
      timelineInstance.pause();
    };
  }, [ease, duration, loop, direction]);
  
  // When activeKeyframe changes, animate the timeline to the new state.
  useEffect(() => {
    if (timelineRef.current && activeKeyframe !== undefined) {
      const targetTime = activeKeyframeNumber * duration;
      const currentTime = timelineRef.current.currentTime || 0;
      // Animate a dummy object and update the timeline's seek in the update callback.
      anime({
        targets: { progress: currentTime },
        progress: targetTime,
        duration: duration,
        easing: ease,
        update(anim) {
          if (timelineRef.current) {
            timelineRef.current.seek(anim.animations[0].currentValue);
          }
        },
        complete: () => {
          timelineRef.current?.pause();
        }
      });
    }
  }, [activeKeyframe, activeKeyframeNumber, duration, ease]);


    // Helper: animate the timeline to a target frame.
    const animateToFrame = (frame: TargetKeyframe) => {
      if (!timelineRef.current) return;
      const frameNumber =
        frame === "first"
          ? 0
          : frame === "last"
          ? keyframes.length - 1
          : frame;
      const targetTime = frameNumber * duration;
      const currentTime = timelineRef.current.currentTime || 0;
      anime({
        targets: { progress: currentTime },
        progress: targetTime,
        duration: duration,
        easing: ease,
        update(anim) {
          if (timelineRef.current) {
            timelineRef.current.seek(anim.animations[0].currentValue);
          }
        },
        complete: () => {
          timelineRef.current?.pause();
        }
      });
    };


    // Effect for interaction states (hover or click take precedence).
    useEffect(() => {
      if (timelineRef.current) {
        if (isSVGClicked && clickFrame !== undefined) {
          animateToFrame(clickFrame);
        } else if (isSVGHovered && hoverFrame !== undefined) {
          animateToFrame(hoverFrame);
        }
      }
    }, [isSVGHovered, isSVGClicked, clickFrame, hoverFrame, duration, ease]);
  
    // Effect for activeKeyframe changes (when not interacting).
    useEffect(() => {
      if (!isSVGHovered && !isSVGClicked && timelineRef.current && activeKeyframe !== undefined) {
        animateToFrame(activeKeyframe);
      }
    }, [activeKeyframe, isSVGHovered, isSVGClicked, duration, ease]);

    // Return to default activeKeyframe after active or hover state ends.
    useEffect(() => {
      if (!isSVGHovered && !isSVGClicked && timelineRef.current && activeKeyframe !== undefined) {
        animateToFrame(activeKeyframe);
      }
    }, [activeKeyframe, isSVGHovered, isSVGClicked, duration, ease]);
  

  return (
    <svg className={className} ref={svgRef} viewBox={keyframes[0].viewBox}   onMouseEnter={() => setIsSVGHovered(true)}
    onMouseLeave={() => {
      setIsSVGHovered(false);
      setIsSVGClicked(false);
    }}
    onMouseDown={() => setIsSVGClicked(true)}
    onMouseUp={() => setIsSVGClicked(false)}
  >
      {keyframes[0].paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
          fill={path.fill}
          strokeLinecap={path.strokeLinecap as "inherit" | "round" | "butt" | "square"}
          strokeLinejoin={path.strokeLinejoin as "inherit" | "round" | "bevel" | "miter"}
        />
      ))}
    </svg>
  );
};

export default VeitrygghetLogo;

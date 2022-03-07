import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box } from "@mui/material";
import * as React from "react";
import { SVGProps } from "react";
import { theme } from "../src/styles/global";

interface ShurikenPropsInterface {
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
}

const ShurikenImg = (props: ShurikenPropsInterface) => {
  const { width, height, margin, color } = props;

  return (
    <Box width={width} height={height} margin={margin}>
      <svg width="100%" height="100%" viewBox="140 220 220 210" fill="none">
        <path
          d="M251.316 221.349L223.369 289.115L220.92 295.29L147.645 329.842L221.194 356.108L251.943 430.037L283.303 352.977L358.851 318.998L282.012 291.966L251.316 221.349ZM270.026 333.203C267.809 336.774 264.583 339.607 260.756 341.343C256.929 343.079 252.674 343.642 248.528 342.958C244.382 342.275 240.531 340.377 237.464 337.505C234.396 334.632 232.248 330.914 231.293 326.82C230.337 322.727 230.617 318.442 232.096 314.507C233.575 310.572 236.187 307.164 239.601 304.715C243.016 302.265 247.08 300.884 251.28 300.745C255.479 300.607 259.626 301.717 263.195 303.936C265.565 305.408 267.621 307.334 269.247 309.602C270.873 311.87 272.036 314.436 272.671 317.154C273.305 319.872 273.398 322.688 272.944 325.442C272.491 328.195 271.499 330.833 270.026 333.203V333.203Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export default ShurikenImg;

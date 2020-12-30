import * as React from "react";

function SvgDownArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="current"
      stroke="current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.987 511.987"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M387.098 227.115l-77.781 77.803V53.333C309.316 23.878 285.438 0 255.983 0S202.65 23.878 202.65 53.333v251.584l-77.781-77.803c-21.838-21.838-57.245-21.838-79.083 0s-21.838 57.245 0 79.083l202.667 202.667c4.165 4.164 10.917 4.164 15.083 0l202.667-202.667c21.838-21.838 21.838-57.245 0-79.083s-57.245-21.838-79.083 0l-.022.001z" />
    </svg>
  );
}

export default SvgDownArrow;

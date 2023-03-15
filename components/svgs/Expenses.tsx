import * as React from "react"

function SvgComponent(props:any) {
  return (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <style>
          {
            ".cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px}"
          }
        </style>
      </defs>
      <path
        className="cls-1"
        d="M9.14 16.77h3.34a1.43 1.43 0 001.43-1.43 1.43 1.43 0 00-1.43-1.43h-1a1.43 1.43 0 01-1.43-1.43 1.43 1.43 0 011.43-1.43h3.34"
      />
      <path className="cls-1" d="M12 8.18L12 11.05" />
      <path className="cls-1" d="M12 16.77L12 19.64" />
      <path
        className="cls-1"
        d="M20.59 6.27L20.59 22.5 3.41 22.5 3.41 1.5 15.82 1.5 20.59 6.27z"
      />
      <path
        className="cls-1"
        d="M20.59 6.27L20.59 7.23 14.86 7.23 14.86 1.5 15.82 1.5 20.59 6.27z"
      />
    </svg>
  )
}

export default SvgComponent

import * as React from "react"

function Bug(props:any) {
  return (
    <svg
      fill="#000"
      width="60px"
      height="60px"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 7h3V6h1V5h1V4H7V3H6V2h1V1h1v1h1v1h1v1h2V3h1V2h1V1h1v1h1v1h-1v1h-1v1h1v1h1v1h3v2h-2v2h2v2h-2v2h2v2h-3v1h-1v1h-1v1H8v-1H7v-1H6v-1H3v-2h2v-2H3v-2h2V9H3V7m10 11v-1h1v-1h1V8h-1V7h-1V6H9v1H8v1H7v8h1v1h1v1h4m-4-5h4v2H9v-2m0-4h4v2H9V9z" />
    </svg>
  )
}

export default Bug

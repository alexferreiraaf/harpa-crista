import type { SVGProps } from "react";

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px"
      height="24px"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C44.904,34.03,48,29.435,48,24C48,22.659,47.862,21.35,47.611,20.083z"
      />
    </svg>
  );
}

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function ChurchLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 150 150"
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g className="stroke-primary fill-none" strokeWidth="2">
        <path d="M60,95 L60,40 L90,25 L120,40 L120,95 L60,95 Z" />
        <path d="M60,40 L30,55 L30,110 L60,95" />
        <rect x="70" y="50" width="15" height="15" />
        <rect x="95" y="50" width="15" height="15" />
        <rect x="70" y="75" width="15" height="15" />
        <rect x="95" y="75" width="15" height="15" />
      </g>
       <text y="125" x="75" textAnchor="middle" className="fill-primary font-serif" fontSize="8">
        ASSEMBLEIA DE DEUS
      </text>
      <text y="135" x="75" textAnchor="middle" className="fill-primary font-serif" fontSize="8">
        DE OURINHOS/SP
      </text>
    </svg>
  );
}

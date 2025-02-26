export default function LockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256" />
      <rect
        fill="none"
        height="128"
        rx="8"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
        width="176"
        x="40"
        y="88"
      />
      <path
        d="M92,88V52a36,36,0,0,1,72,0V88"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      />
    </svg>
  );
}

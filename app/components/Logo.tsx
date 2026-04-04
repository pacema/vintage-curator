export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 4c-2.8 0-5 2.2-5 5v1.2c0 .5.2 1 .5 1.4l1.3 1.6H8.5c-.6 0-1.1.4-1.3 1l-2 6.5c-.1.3 0 .6.2.9.2.2.5.4.8.4h28.6c.3 0 .6-.2.8-.4.2-.3.3-.6.2-.9l-2-6.5c-.2-.6-.7-1-1.3-1h-8.3l1.3-1.6c.3-.4.5-.9.5-1.4V9c0-2.8-2.2-5-5-5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M12 26v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

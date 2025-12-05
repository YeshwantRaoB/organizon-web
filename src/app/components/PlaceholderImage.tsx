interface PlaceholderImageProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

const PlaceholderImage = ({ width = '100%', height = '100%', text = 'Image Placeholder' }: PlaceholderImageProps) => (
  <div
    style={{
      width,
      height,
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      padding: '20px',
    }}
    role="img"
    aria-label={text}
  >
    <div>
      <svg
        className="mx-auto mb-2"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <div>{text}</div>
    </div>
  </div>
);

export default PlaceholderImage;

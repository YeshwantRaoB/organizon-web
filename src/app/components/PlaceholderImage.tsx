const PlaceholderImage = ({ width = '100%', height = '100%' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Placeholder image"
    style={{
      backgroundColor: '#f0f0f0',
      color: '#aaa',
      textAlign: 'center',
      fontSize: '12px',
    }}
  >
    <text x="50%" y="50%" dy=".3em" dominantBaseline="middle" textAnchor="middle">
      Image
    </text>
  </svg>
);

export default PlaceholderImage;

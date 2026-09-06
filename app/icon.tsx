import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B10',
          borderRadius: 8,
          border: '1px solid rgba(255, 94, 20, 0.3)',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: 'serif',
            fontWeight: 700,
            color: '#FF5E14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            marginTop: -2,
          }}
        >
          P
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { MARQUEE_ITEMS } from '@/data/content'

// Simple single-row marquee — lightweight, professional
export default function Marquee() {
  // Duplicate once for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      style={{
        overflow:     'hidden',
        padding:      '12px 0',
        borderTop:    '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background:   'var(--bg-secondary)',
        position:     'relative',
        willChange:   'transform',
      }}
    >
      {/* Left fade */}
      <div style={{
        position:'absolute',left:0,top:0,bottom:0,width:'80px',
        background:'linear-gradient(to right, var(--bg-secondary), transparent)',
        zIndex:1, pointerEvents:'none',
      }}/>
      {/* Right fade */}
      <div style={{
        position:'absolute',right:0,top:0,bottom:0,width:'80px',
        background:'linear-gradient(to left, var(--bg-secondary), transparent)',
        zIndex:1, pointerEvents:'none',
      }}/>

      <div
        style={{
          display:   'flex',
          gap:       '32px',
          width:     'max-content',
          animation: 'marquee 30s linear infinite',
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '10px',
              flexShrink: 0,
            }}
          >
            <span style={{
              width:'5px', height:'5px', borderRadius:'50%',
              background:'var(--accent)', display:'block', flexShrink:0,
            }}/>
            <span style={{
              fontFamily: 'DM Mono, monospace',
              fontSize:   '12px',
              color:      'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
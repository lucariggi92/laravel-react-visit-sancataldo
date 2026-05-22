export default function Header(){
    return(
        <header style={{
            backgroundColor: '#1b2631',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #2c3e50',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          
            <div style={{
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                Visit <span style={{ color: '#8fa3b4', fontWeight: '300' }}>San Cataldo</span>
            </div>

            
            <nav style={{ display: 'flex', gap: '20px' }}>
                <span style={{ color: '#8fa3b4', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Esplora
                </span>
            </nav>
        </header>
    )
}
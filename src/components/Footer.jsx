export default function Footer(){
    return(
        <footer style={{
            backgroundColor: '#121a21',
            padding: '30px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1b2631',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            flexWrap: 'wrap',
            gap: '20px'
        }}>
    
            <div>
                <div style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '4px'
                }}>
                    Visit San Cataldo
                </div>
                <div style={{ color: '#566f85', fontSize: '0.75rem', fontWeight: '500' }}>
                    © {new Date().getFullYear()} • la tua Guida Turistica Digitale
                </div>
            </div>

       
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <a href="https://www.instagram.com/visit_sancataldo/" target="_blank" rel="noreferrer" 
                   style={{ color: '#b2c2d1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#00f0ff'}
                   onMouseOut={(e) => e.target.style.color = '#b2c2d1'}>
                    Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579456103577&locale=it_IT" target="_blank" rel="noreferrer" 
                   style={{ color: '#b2c2d1', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#00f0ff'}
                   onMouseOut={(e) => e.target.style.color = '#b2c2d1'}>
                    Facebook
                </a>
              
            </div>
        </footer>
    )
}
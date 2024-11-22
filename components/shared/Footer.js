import Link from 'next/link';
import { FaGithub, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div style={{
      backgroundColor: 'black',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #ddd'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>2024 © SOLVE IT | All Rights Reserved.</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            Developed by <span style={{ fontWeight: 'bold' }}>GNDEC</span>
          </p>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <Link href='https://github.com/Gagan-9' target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" style={{ fontSize: '24px', color: 'white' }} />
          </Link>
          <Link href='mailto:your-email@example.com' target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="icon" style={{ fontSize: '24px', color: 'white' }} />
          </Link>
          <Link href='https://linkedin.com' target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="icon" style={{ fontSize: '24px', color: '#0e76a8' }} />
          </Link>
          <Link href='https://twitter.com' target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon" style={{ fontSize: '24px', color: '#1da1f2' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;

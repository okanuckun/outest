import { useEffect } from 'react';

const EEGRedirect = () => {
  useEffect(() => {
    // Force full page navigation to the static HTML file (bypasses React Router)
    window.location.replace('/eeg/index.html');
  }, []);

  return (
    <div style={{
      background: '#050505',
      color: '#707070',
      fontFamily: 'monospace',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
    }}>
      Loading...
    </div>
  );
};

export default EEGRedirect;

import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    setAspectRatio(0.5765765765765766);
  }, []);

  return <div style={{ aspectRatio, background: '#f00', width: 200 }}>Hello, world!</div>;
}

createRoot(document.querySelector('#root')!).render(<App />);

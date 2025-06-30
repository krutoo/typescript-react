import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Modal } from './components/modal/modal.tsx';
import './index.css';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Hello, world!</h1>
      <button onClick={() => setOpen(true)}>Show modal</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Hello from Modal!</h2>
      </Modal>
    </>
  );
}

createRoot(document.querySelector('#root')!).render(<App />);

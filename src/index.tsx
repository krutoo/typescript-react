import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

createRoot(document.querySelector("#root")!).render(<App />);

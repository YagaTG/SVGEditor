import { ZoomButtons } from "./components/Zoom/ZoomButtons";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { CanvasProvider } from "./context/CanvasContext";
import { Canvas } from "./components/Canvas/Canvas";
import "./App.css";

function App() {
  return (
    <main className="container">
      <CanvasProvider>
        <Sidebar />
        <Canvas />
        <ZoomButtons />
      </CanvasProvider>
    </main>
  );
}

export default App;

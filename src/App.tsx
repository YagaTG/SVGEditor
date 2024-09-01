import { Sidebar } from "./components/Sidebar/Sidebar";
import { Canvas } from "./components/Canvas/Canvas";
import { ZoomButtons } from "./components/Zoom/ZoomButtons";
import { CanvasProvider } from "./context/CanvasContext";
import { HistoryButtons } from "./components/HistoryButtons/HistoryButtons";
import "./App.css";

function App() {
  return (
    <main className="container">
      <CanvasProvider>
        <HistoryButtons />
        <Sidebar />
        <Canvas />
        <ZoomButtons />
      </CanvasProvider>
    </main>
  );
}

export default App;

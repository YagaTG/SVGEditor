import { Sidebar } from "./components/Sidebar/Sidebar";
import { Canvas } from "./components/Canvas/Canvas";
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
      </CanvasProvider>
    </main>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageDetection from './Components/image_detection';
import WebCam from './Components/web_cam';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ImageDetection />} />
          <Route path="/webcam" element={<WebCam />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


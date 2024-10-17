// client/src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CleaningServices from "./pages/CleaningServices";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cleaning-services" element={<CleaningServices />} />
      </Routes>
    </Router>
  );
}

export default App;

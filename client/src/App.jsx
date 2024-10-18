import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CleaningServices from "./pages/CleaningServices";
import Signup from "./pages/Signup"; // Import the Signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cleaning-services" element={<CleaningServices />} />
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </Router>
  );
}

export default App;

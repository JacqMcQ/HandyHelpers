import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import CleaningServices from "./pages/CleaningServices";
import Signup from "./pages/Signup"; // Import the Signup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cleaning-services" element={<CleaningServices />} />
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </Router>
  );
}

export default App;

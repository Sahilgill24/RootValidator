import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard-page";
import PrivateRoute from "@/components/private-route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<DashboardPage />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;

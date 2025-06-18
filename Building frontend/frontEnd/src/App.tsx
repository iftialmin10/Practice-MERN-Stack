import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

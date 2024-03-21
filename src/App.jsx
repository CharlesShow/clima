import "./css/index.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div id="container">
      <Outlet />
    </div>
  );
}

export default App;

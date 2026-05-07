
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import User from "./User.tsx";
import Rider from "./Rider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <nav style={{ margin: "20px" }}>
      <div style={{ padding: "20px" }}>
        <Link to="/user">user</Link>
      </div>
      <div>
        <Link to="/rider">rider</Link>
      </div>
    </nav>

    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/rider" element={<Rider />} />
    </Routes>
  </BrowserRouter>,
);

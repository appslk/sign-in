import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <div>
      <ul id="bg-animation">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

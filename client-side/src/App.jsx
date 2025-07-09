import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/update/:id" element={<UpdateUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import CoffeeDetail from "./pages/CoffeeDetail.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
 


function App() {
  return (
    <div className="app">
      <NavBar />
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<CoffeeDetail />} />
        <Route path="/admin" element={<AdminPortal />} />

        <Route path="*" element={<p className="message">That page doesn't exist.</p>} />
      </Routes>
    </div>
  );
}
 
export default App;
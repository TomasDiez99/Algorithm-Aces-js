import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Navbar from './HomeComponents/Navbar';
import Footer from './HomeComponents/Footer';

function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Footer/>
        </div>

    );
}

export default App;

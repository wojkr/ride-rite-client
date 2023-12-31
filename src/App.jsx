import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";

import Checkout from "./scenes/checkout/Checkout";
import Conformation from "./scenes/checkout/Conformation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Menu from "./scenes/global/Menu";
import Footer from "./scenes/global/Footer";
import Error from "./scenes/global/Error";
import RegisterUser from "./scenes/user/RegisterUser";
import User from "./scenes/user/User";
import LoginUser from "./scenes/user/LoginUser";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import { user } from "./Model/menu";
import OurStores from "./scenes/ourStores/OurStores";
import Search from "./scenes/search/Search";
import AboutUs from "./scenes/aboutUs/AboutUs";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
function App() {
  return (
    <div className="app">
      <HashRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="item/:itemId" element={<ItemDetails />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Conformation />} />

          <Route path={`/${user.linkText}`} element={<User />} />
          <Route path={`/${user.login.link()}`} element={<LoginUser />} />
          <Route path={`/${user.register.link()}`} element={<RegisterUser />} />

          <Route path="/ourstores" element={<OurStores />} />

          <Route path="/search/:query" element={<Search />} />

          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/error" element={<Error />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <CartMenu />
        <Menu />
        <Footer />
        {/* utils */}
      </HashRouter>
    </div>
  );
}

export default App;

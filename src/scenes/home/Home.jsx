import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import About from "./About";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const sectionId = location.hash.substring(1);
  useLayoutEffect(() => {
    console.log(sectionId);
    // const hash = window.location.hash.substring(3);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView();
    }
  }, [location]);
  return (
    <div className="home pb-3">
      <MainCarousel />
      <About />
      <ShoppingList />
      <Subscribe />
    </div>
  );
};
export default Home;

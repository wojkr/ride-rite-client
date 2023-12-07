import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import About from "./About";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const sectionId = location.hash.substring(1);
  const categoryId = location.search.substring(1);

  useEffect(() => {
    const element = document.getElementById(
      sectionId.substring(0, 1).toUpperCase() + sectionId.substring(1)
    );
    if (element) {
      element.scrollIntoView();
    }
  }, [location, window.location.hash]);
  return (
    <>
      <MainCarousel />
      <About />
      <ShoppingList categoryId={categoryId} />
      <Subscribe />
    </>
  );
};
export default Home;

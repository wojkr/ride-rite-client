import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import About from "./About";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const sectionId = location.hash.substring(1);
  const categoryId = location.search.substring(1);

  useLayoutEffect(() => {
    const element = document.getElementById(sectionId);
    console.log(element);
    console.log(`sectionId:${sectionId}, categoryId:${categoryId}`);
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

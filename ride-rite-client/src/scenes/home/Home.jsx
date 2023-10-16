import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import About from "./About";

const Home = () => {
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

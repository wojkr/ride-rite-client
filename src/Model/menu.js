const preHash = "/#";

const home = {
  title: "Home",
  linkText: "Home",
  link: function () {
    return preHash + this.linkText;
  },
};

const about = {
  title: "About",
  linkText: "About",
  link: function () {
    return preHash + this.linkText;
  },
};

const products = {
  title: "Products",
  linkText: "Products",
  link: function () {
    return preHash + this.linkText;
  },
};

const subscribe = {
  title: "Subscribe",
  linkText: "Subscribe",
  link: function () {
    return preHash + this.linkText;
  },
};

const ourstores = {
  title: "Our Stores",
  linkText: "OurStores",
  link: function () {
    //OTHER ROUTE, no hash
    return "/" + this.linkText;
  },
  isLast: true,
};

const menu = [home, about, products, subscribe, ourstores];
export { home, about, products, subscribe, ourstores, menu };

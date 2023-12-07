const preHash = "/#";

const home = {
  title: "Home",
  linkText: "home",
  link: function () {
    return preHash + this.linkText;
  },
};

const about = {
  title: "About",
  linkText: "about",
  link: function () {
    return preHash + this.linkText;
  },
};
const aboutus = {
  title: "About Us",
  linkText: "aboutus",
  link: function () {
    return "/" + this.linkText;
  },
};

const products = {
  title: "Products",
  linkText: "products",
  link: function () {
    return preHash + this.linkText;
  },
};

const subscribe = {
  title: "Subscribe",
  linkText: "subscribe",
  link: function () {
    return preHash + this.linkText;
  },
};

const ourstores = {
  title: "Our Stores",
  linkText: "ourstores",
  link: function () {
    //OTHER ROUTE, no hash
    return "/" + this.linkText;
  },
  isLast: true,
};
const user = {
  title: "User",
  linkText: "user",
  register: {
    title: "Register",
    linkText: "register",
    link: function () {
      return "/" + user.linkText + "/" + this.linkText;
    },
  },
  login: {
    title: "Login",
    linkText: "login",
    link: function () {
      return "/" + user.linkText + "/" + this.linkText;
    },
  },
  link: function () {
    return "/" + this.linkText;
  },
};
const item = {
  title: "Item",
  linkText: "item",
  link: function () {
    return "/" + this.linkText;
  },
};
const search = {
  title: "Search",
  linkText: "search",
  link: function () {
    return "/" + this.linkText;
  },
};
const menu = [home, about, products, subscribe, ourstores];
export {
  home,
  about,
  products,
  subscribe,
  ourstores,
  user,
  menu,
  item,
  search,
  aboutus,
};

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
const menu = [home, about, products, subscribe, ourstores];
export { home, about, products, subscribe, ourstores, user, menu, item };

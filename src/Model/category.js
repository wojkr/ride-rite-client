export const category = {
  newArrival: "newArrival",
  topRated: "topRated",
  bestSeller: "bestSeller",
  all: "all",
  check: function (categoryId) {
    return Object.values(this).indexOf(categoryId) < 0
      ? this.all
      : this[categoryId];
  },
};

// Sortable.js Here
let container = document.querySelector(".all-albums");
let names = document.querySelectorAll(".album-block");

Sortable.create(container, {
  animation: 150,
  group: "album-sort-order",
  store: {
    /**
     * Get the order of elements. Called once during initialization.
     * @param   {Sortable}  sortable
     * @returns {Array}
     */
    get: function(sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split("|") : [];
    },
    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function(sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join("|"));
    }
  }
});

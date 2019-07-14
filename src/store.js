import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// eslint-disable-next-line
const client = algoliasearch("HH28PKONWC", "f4b07580d6551b52c3128da9e8a74426");
const searchConn = client.initIndex("tft");

export default new Vuex.Store({
  state: {
    currentSearchType: "Items",
    basic_items: [],
    combined_items: [],
    baseItems: [],
    champions: [],
    searchVal: "",
    searchTypes: ["Items", "Champions"]
  },
  getters: {
    currentSearchType: state => state.currentSearchType,
    searchVal: state => state.searchVal,
    basic_items: state => state.basic_items,
    combined_items: state => state.combined_items,
    baseItems: state => state.baseItems,
    champions: state => state.champions,
    searchTypes: state => state.searchTypes,
  },
  mutations: {
    clear: state => {
      state.searchVal = "";
    },
    setCurrentSearchType: (state, val) => {
      state.currentSearchType = val;
    },
    setSearchVal: (state, val) => {
      state.searchVal = val;
    },
    setBasicItems: (state, basic_items) => {
      state.basic_items = basic_items;
    },
    setCombinedItems: (state, combined_items) => {
      state.combined_items = combined_items;
    },
    setBaseItems: (state, baseItems) => {
      state.baseItems = baseItems;
    },
    setChampions: (state, champions) => {
      state.champions = champions;
    }
  },
  actions: {
    search: debounce(function (context, e = '') {
      const current_value = e && e.target ? e.target.value : e;
      searchConn.search({
        query: ("" + current_value).trim(),
        filters: context.getters.currentSearchType === 'Items' ? 'item' : 'champion',
        hitsPerPage: 100
      },
        (err, data) => {
          if (err) throw err;

          // Handel returned items search
          if (context.getters.currentSearchType === 'Items') {
            let basic_items = [];
            let combined_items = [];

            data.hits.forEach(h => {
              if (h.item_type === "combined") {
                combined_items.push(h);
              } else {
                basic_items.push(h);
              }
            });
            if (context.getters.baseItems.length === 0) context.commit('setBaseItems', basic_items);
            context.commit('setBasicItems', sortItems(basic_items));
            context.commit('setCombinedItems', sortItems(combined_items));
          }
          // Handel returned champions search          
          else if (context.getters.currentSearchType === 'Champions') {
            console.log(data.hits.length)
            context.commit('setChampions', data.hits);
          }
        });
    }, 125),
    filterItems: function ({ commit }, { event, name }) {
      let searchVal = document.getElementsByClassName("search-box-input")[0].querySelectorAll("input")[0].value;
      let targetVal = name ? name : event.target.closest(".item-container").dataset.name;

      commit('setSearchVal', searchVal === targetVal ? '' : targetVal);
    },
  }
})

// eslint-disable-next-line
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

function sortItems(arr) {
  arr.sort(function (a, b) {
    var nameA = a.display_name.toUpperCase();
    var nameB = b.display_name.toUpperCase();
    if (nameA < nameB) return -1;

    if (nameA > nameB) return 1;

    return 0;
  });

  return arr;
}

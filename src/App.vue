<template>
  <v-app dark id="app-container">
    <v-flex xs12 class="search-box-container">
      <button class="clear-btn" @click="clear()">X</button>
      <v-text-field
        class="search-box-input"
        label="Solo"
        placeholder="Search"
        solo
        @keyup="search($event)"
        v-model='searchVal'
      ></v-text-field>
    </v-flex>
    <div class="items-list">
      <v-container grid-list-md text-xs-center fluid v-if="basic_items.length > 0">
        <h2 class="section-title">Base Items</h2>
        <v-layout row wrap>
          <v-flex
            class="item-container"
            :id="item.id"
            v-for="item in basic_items"
            :key="item.id"
            xs12
            sm6
            md4
            @click="filterItems($event)"
            :data-name="item.display_name"
          >
            <v-card hover>
              <v-card-title primary-title class="item-card">
                <div class="item-img" :style="'background: url('+item.icon_img+') no-repeat;'"></div>
                <p class="title font-weight-medium">{{ item.display_name }}</p>
                <v-flex v-if="item.stats" class="item-stat">
                  <p class="font-weight-medium">{{ item.stats.stat_type }}</p>
                  <p class="font-weight-medium">{{ item.stats.bonus_amt }}</p>
                </v-flex>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-md text-xs-center fluid v-if="combined_items.length > 0">
        <h2 class="section-title">Combined Items</h2>
        <v-layout row wrap>
          <v-flex
            class="item-container"
            :id="item.id"
            v-for="item in combined_items"
            :key="item.id"
            xs12
            sm6
            md4
            @click="filterItems($event)"
            :data-name="item.display_name"
          >
            <v-card hover style="height: 100%">
              <v-card-title primary-title class="item-card">
                <div class="item-img" :style="'background: url('+item.icon_img+') no-repeat;'"></div>
                <v-layout row class="item-info">
                  <v-flex>
                    <p class="title font-weight-medium">{{ item.display_name }}</p>
                    <p class="font-weight-light">{{ item.description }}</p>
                    <div class="item-combo-container">
                      <img
                        class="combo-item-img"
                        :src="(items.filter(t => t.id === item.combos[0])[0] || {}).icon_img"
                        @click.stop="filterItems($event, (items.filter(t => t.id === item.combos[0])[0] || {}).display_name)"
                      />

                      <span class="plus">+</span>

                      <img
                        class="combo-item-img"
                        :src="(items.filter(t => t.id === item.combos[1])[0] || {}).icon_img"
                        @click.stop="filterItems($event, (items.filter(t => t.id === item.combos[1])[0] || {}).display_name)"
                      />
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-footer style="padding: 0 24px; justify-content: flex-end; margin-top: 15px;">
      SITE DESIGNED BY <a style="margin-left: 5px;" href="https://command.dev/"> COMMAND DEVELOPMENT, LLC</a>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
body {
  user-select: none;
}
input {
  user-select: auto;
}
.items-list {
  padding-top: 35px;
}
.section-title {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px #000 solid;
}

.item-info {
  max-width: calc(100% - 65px);
}

.item-img {
  border-radius: 10px;
  height: 64px;
  width: 64px;
}

.item-card {
  justify-content: space-between;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;

  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
}

.item-card .title {
  margin-bottom: 5px;
  font-size: 18px !important;
}

.item-card-actions {
  padding-bottom: 0;
}

.item-stat {
  flex: none;
  width: 80px;
}

.item-stat p {
  font-size: 12px;
  margin-bottom: 5px;
}

.item-stat p:nth-child(2) {
  font-size: 18px;
  color: rgb(0, 211, 0);
}

.searching .item-container.showing {
  display: block;
}

.searching .item-container {
  display: none;
}

.search-box-container {
  height: 76px;
  position: fixed;
  width: 100%;
  z-index: 100;
  display: flex;
}

.item-combo-container {
  display: flex;
  justify-content: space-evenly;
}

img.combo-item-img:last-child::before {
  content: "+";
}

img.combo-item-img {
  width: 32px;
}

.item-combo-container > img {
    border-radius: 8px;
}

.plus {
  font-size: 22px;
}

.clear-btn {
  padding: 0px 18px;
  background-color: #ff5252 !important;
  height: 48px;
  font-weight: 900;
  font-size: 22px;
}
</style>

<script>
// eslint-disable-next-line
const client = algoliasearch("HH28PKONWC", "f4b07580d6551b52c3128da9e8a74426");
const index = client.initIndex("tft");

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export default {
  name: "App",
  methods: {
    clear: function() {
      this.searchVal = ""; 
    },
    filterItems: function(e, name) {
      let searchVal = document.getElementsByClassName("search-box-input")[0].querySelectorAll("input")[0].value;
      let targetVal = name ? name : e.target.closest(".item-container").dataset.name;
      this.searchVal = searchVal === targetVal ? '' :  targetVal;
    },
    search: debounce(function(e) {
      const current_value = e.target ? e.target.value : e;

      index.search(
        {
          query: ("" + current_value).trim(),
          hitsPerPage: 100
        },
        (err, data) => {
          if (err) throw err;

          let basic_items = [];
          let combined_items = [];

          data.hits.forEach(h => {
            if (h.item_type === "combined") {
              combined_items.push(h);
            } else {
              basic_items.push(h);
            }
          });

          basic_items.sort(function(a, b) {
            var nameA = a.display_name.toUpperCase();
            var nameB = b.display_name.toUpperCase();
            if (nameA < nameB) return -1;

            if (nameA > nameB) return 1;

            return 0;
          });

          combined_items.sort(function(a, b) {
            var nameA = a.display_name.toUpperCase();
            var nameB = b.display_name.toUpperCase();
            if (nameA < nameB) return -1;

            if (nameA > nameB) return 1;

            return 0;
          });

          this.basic_items = basic_items;
          this.combined_items = combined_items;
        }
      );
    }, 100)
  },
  data() {
    return {
      basic_items: [],
      combined_items: [],
      items: [],
      searchVal: ""
    };
  },
  mounted() {
    index.search(
      {
        query: "",
        hitsPerPage: 100
      },
      (err, data) => {
        if (err) throw err;
        let basic_items = [];
        let combined_items = [];

        data.hits.forEach(h => {
          if (h.item_type === "combined") {
            combined_items.push(h);
          } else {
            basic_items.push(h);
          }
        });

        basic_items.sort(function(a, b) {
          var nameA = a.display_name.toUpperCase();
          var nameB = b.display_name.toUpperCase();
          if (nameA < nameB) return -1;

          if (nameA > nameB) return 1;

          return 0;
        });

        combined_items.sort(function(a, b) {
          var nameA = a.display_name.toUpperCase();
          var nameB = b.display_name.toUpperCase();
          if (nameA < nameB) return -1;

          if (nameA > nameB) return 1;

          return 0;
        });

        this.items = data.hits;
        this.basic_items = basic_items;
        this.combined_items = combined_items;
      }
    );
  },
  updated() {
    var val = document
      .getElementsByClassName("search-box-input")[0]
      .querySelectorAll("input")[0].value;

    this.search(val);
  }
};
</script>

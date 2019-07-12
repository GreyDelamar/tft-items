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
        :value="searchVal"
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
            sm4
            @click="filterItems($event)"
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
            sm4
            @click="filterItems($event)"
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
                      />

                      <span class="plus">+</span>

                      <img
                        class="combo-item-img"
                        :src="(items.filter(t => t.id === item.combos[1])[0] || {}).icon_img"
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
  </v-app>
</template>

<style lang="scss">
.items-list {
  padding-top: 35px;
}
.section-title {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px #000 solid;
}

.item-info {
  @media only screen and (max-width: 1200px) {
    max-width: 280px;
  }
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
    filterItems: function(e) {
      this.searchVal = e.target.closest(".item-container").id;
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

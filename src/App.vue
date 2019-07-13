<template>
  <v-app dark id="app-container" @keypress="hotKeyClear($event)">
    <v-flex xs12 class="search-box-container">
      <button class="clear-btn" @click="clear()">X</button>
      <v-text-field
        class="search-box-input"
        label="Solo"
        placeholder="Search"
        solo
        @keyup="searchItems($event)"
        :value="searchVal"
      ></v-text-field>
    </v-flex>
    <div class="items-list">
      <v-container grid-list-md text-xs-center fluid v-if="basic_items.length > 0">
        <div @click="filterItems($event, 'Basic')">
          <h2 class="section-title">Base Items</h2>
        </div>
        <v-layout row wrap>
          <itemCard v-for="item in basic_items" :key="item.id" :item="item"></itemCard>
        </v-layout>
      </v-container>
      <v-container grid-list-md text-xs-center fluid v-if="combined_items.length > 0">
        <div @click="filterItems($event, 'Combined')">
          <h2 class="section-title">Combined Items</h2>
        </div>
        <v-layout row wrap>
          <itemCard
            v-for="item in combined_items"
            :key="item.id"
            :item="item"
            :comboOne="(baseItems.filter(t => t.id === item.combos[0])[0] || {})"
            :comboTwo="(baseItems.filter(t => t.id === item.combos[1])[0] || {})"
          ></itemCard>
        </v-layout>
      </v-container>
    </div>
    <v-footer style="padding: 0 24px; justify-content: space-between; margin-top: 15px;">
      <span>Ctrl + Bksp (Will clear the search)</span>
      <span>
        Site Designed By
        <a
          style="margin-left: 5px;"
          href="https://command.dev/"
        >Command Development, LLC</a>
      </span>
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
  min-height: calc(100vh - 50px);
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
  max-height: 48px;
  .v-text-field__details {
    display: none;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
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

h2 {
  cursor: pointer;
}
</style>

<script>
import itemCard from "./components/item-card.vue";

export default {
  name: "App",
  components: {
    itemCard
  },
  methods: {
    filterItems: function(event, name) {
      console.log("CLICK");
      this.$store.dispatch("filterItems", { event, name });
    },
    searchItems: function(e) {
      const val = e && e.target ? e.target.value : e;
      this.$store.dispatch("searchItems", val);
    },
    clear: function() {
      this.$store.commit("clear");
    }
  },
  computed: {
    searchVal(state) {
      return this.$store.state.searchVal;
    },
    basic_items(state) {
      return this.$store.state.basic_items;
    },
    combined_items(state) {
      return this.$store.state.combined_items;
    },
    baseItems(state) {
      return this.$store.state.baseItems;
    }
  },
  beforeCreate() {
    this.$store.dispatch("searchItems");
  },
  watch: {
    searchVal(val) {
      this.$store.dispatch("searchItems", val);
    }
  },
  updated() {
    const self = this;

    window.addEventListener("keydown", function(e) {
      if (e && e.ctrlKey && e.key === "Backspace") {
        e.preventDefault();
        self.clear();
      }
    });
  }
};
</script>

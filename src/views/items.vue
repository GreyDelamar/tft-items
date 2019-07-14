<template>
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
</template>

<script>
import itemCard from "../components/item-card.vue";

export default {
  name: "ItemsList",
  components: {
    itemCard
  },
  methods: {
    filterItems: function(event, name) {
      this.$store.dispatch("filterItems", { event, name });
    },
    clear: function() {
      // document
      //   .querySelectorAll(".search-box-container")[0]
      //   .querySelectorAll("input")[0].value = "";
      this.$store.commit("clear");
    }
  },
  computed: {
    basic_items() {
      return this.$store.state.basic_items;
    },
    combined_items() {
      return this.$store.state.combined_items;
    },
    baseItems() {
      return this.$store.state.baseItems;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.clear());
  },
  mounted() {
    this.$store.commit("setCurrentSearchType", "Items");
    this.$store.dispatch("search");
  }
};
</script>
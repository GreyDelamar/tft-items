<template>
  <div class="items-list">
    <v-container grid-list-md text-xs-center fluid v-if="champions.length > 0">
      <div @click="filterItems($event, 'Champions')">
        <h2 class="section-title">Champions</h2>
      </div>
      <v-layout row wrap>
        <champCard v-for="champ in champions" :key="champ.display_name" :item="champ"></champCard>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import champCard from "../components/champCard.vue";

export default {
  name: "ChampList",
  components: {
    champCard
  },
  methods: {
    filterItems: function(event, name) {
      this.$store.dispatch("filterItems", { event, name });
    },
    search: function(e) {
      const val = e && e.target ? e.target.value : e;
      this.$store.dispatch("search", val);
    },
    clear: function() {
      this.$store.commit("clear");
    }
  },
  computed: {
    searchVal() {
      return this.$store.state.searchVal;
    },
    champions() {
      return this.$store.state.champions;
    }
  },
  mounted() {
    this.$store.commit("setCurrentSearchType", "Champions");
    this.$store.dispatch("search");
  }
};
</script>
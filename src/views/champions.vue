<template>
  <div class="items-list">
    <v-container grid-list-md text-xs-center fluid>
      <div>
        <h2 class="section-title">Champions</h2>
      </div>
      <v-layout row wrap xs12>
        <v-flex v-for="(champs, name) in championTypeLists" :key="name +'_'+ champs.length">
          <h2 class="section-title">{{ name }}</h2>
          <champCard v-for="champ in champs" :key="champ" :champName="champ"></champCard>
        </v-flex>
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
      // document
      //   .querySelectorAll(".search-box-container")[0]
      //   .querySelectorAll("input")[0].value = "";
      this.$store.commit("clear");
    }
  },
  computed: {
    searchVal() {
      return this.$store.state.searchVal;
    },
    champions() {
      return this.$store.state.champions;
    },
    championTypeLists() {
      console.log(this.$store.state.championTypeLists);
      // sortItems;
      return this.$store.state.championTypeLists;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.clear());
  },
  mounted() {
    this.$store.commit("setCurrentSearchType", "Champions");
    if (this.$store.state.champions.length === 0)
      this.$store.dispatch("search");
  }
};
</script>
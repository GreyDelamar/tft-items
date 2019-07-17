<template>
  <div class="items-list">
    <v-container grid-list-md text-xs-center fluid>
      <div>
        <h2 class="section-title">Champions</h2>
      </div>
      <v-layout row wrap xs12>
        <v-flex v-for="(cl, key) in showingClasses" :key="cl.name" class="champClass">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <h2 @click="addTag(key)" v-on="on" class="section-title" >{{ cl.name }}</h2>
            </template>
            <span>{{cl.description}}</span>
          </v-tooltip>
          <div v-for="(b, i) in cl.bonuses" :key="b+i" :class="'bonus_'+i" style="margin-bottom: 10px; display: flex; justify-content: space-around;">
            <span>({{b.needed}}) </span>
            <span> {{b.effect}}</span>
          </div>
          <champCard v-for="champ in classChamps[key]" :key="champ" :champName="champ"></champCard>
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
    clear: function() {
      this.$store.commit("clear");
    },
    addTag: function(tag) {
      this.$store.commit("addOrRemoveTag", tag);
    }
  },
  computed: {
    classChamps() {
      return this.$store.state.classChamps;
    },
    showingClasses() {
      return this.$store.state.showingClasses;
    }
  },
  mounted() {
    this.$store.commit("setCurrentSearchType", "Champions");
  }
};
</script>
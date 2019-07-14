<template>
  <v-app dark id="app-container">
    <header>
      <!-- MASTER SEARCH -->
      <v-flex xs12 class="search-box-container">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <button class="cd-btn" v-on="on">{{ currentSearchType }}</button>
          </template>
          <v-list>
            <v-list-tile v-for="(st, index) in searchTypes" :key="st + index" @click="route(st)">
              <v-list-tile-title>{{ st }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-text-field
          class="search-box-input"
          label="Solo"
          placeholder="Search"
          solo
          @keyup="search($event)"
          v-model="searchVal"
        ></v-text-field>
        <button class="clear-btn" @click="clear()">X</button>
      </v-flex>
    </header>

    <!-- PLACEMENT FOR VIEWS -->
    <main class="cd-body">
      <router-view></router-view>
    </main>

    <!-- FOOTER -->
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
@import "./assets/styles/_styles.scss";
</style>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    search: function(e) {
      const val = e && e.target ? e.target.value : e;
      this.$store.dispatch("search", val);
    },
    clear: function() {
      this.$store.commit("clear");
    },
    route: function(route) {
      this.$router.push(route);
    }
  },
  computed: {
    searchVal: {
      get() {
        return this.$store.state.searchVal;
      },
      set(value) {
        this.$store.commit("setSearchVal", value);
      }
    },
    searchTypes() {
      return this.$store.state.searchTypes;
    },
    currentSearchType() {
      return this.$store.state.currentSearchType;
    }
  },
  // watch: {
  //   searchVal(val) {
  //     console.log("test");
  //     this.$store.dispatch("search", val);
  //   }
  // },
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

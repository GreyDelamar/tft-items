<template>
  <v-app dark id="app-container">
    <header>
      <!-- MASTER SEARCH -->
      <v-flex xs12 class="search-box-container">
        <v-menu offset-y v-model="menuOpen">
          <template v-slot:activator="{ on }">
            <button class="cd-btn" v-on="on">
              {{ currentSearchType }}
              <v-icon
                v-if="menuOpen"
                style="position: absolute; right: 0; top: 12px;"
              >keyboard_arrow_down</v-icon>
              <v-icon
                v-if="!menuOpen"
                style="position: absolute; right: 0; top: 12px;"
              >keyboard_arrow_up</v-icon>
            </button>
          </template>
          <v-list>
            <v-list-tile v-for="(st, index) in searchTypes" :key="st + index" @click="route(st)">
              <v-list-tile-title>{{ st }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-text-field
          v-if="currentSearchType === 'Items'"
          class="search-box-input"
          label="Solo"
          placeholder="Search Items"
          solo
          @keyup="search($event)"
          v-model="searchVal"
        ></v-text-field>
        <tagSearch v-if="currentSearchType !== 'Items'"></tagSearch>
        <!-- <tagDropdown :tags="tags" v-if="currentSearchType !== 'Items'"></tagDropdown> -->

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
import tagSearch from "./components/tagSearch";
import tagDropdown from "./components/tagDropdown";

export default {
  name: "App",
  components: {
    tagSearch,
    tagDropdown
  },
  data: () => {
    return {
      menuOpen: false
    };
  },
  methods: {
    search: function(e) {
      const val = e && e.target ? e.target.value : e;
      this.$store.dispatch("search", val);
    },
    clear: function() {
      this.$store.commit("clear");
    },
    route: function(r) {
      r = r.toLowerCase();
      r = r !== 'items' ? r : '/'
      this.$router.push(r);
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
    },
    tags: {
      get: function() {
        return this.$store.state.currentTags;
      },
      set: function(val) {
        this.$store.state.currentTags = val;
      }
    }
  },
  watch: {
    searchVal(val) {
      this.$store.dispatch("search", val);
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

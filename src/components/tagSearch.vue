<template>
  <vue-tags-input
    class="search-box-input dark"
    placeholder="Search Champions"
    v-model="tag"
    :tags="tags"
    :autocomplete-items="filteredItems"
    :autocomplete-always-open="openedMenu"
    :add-on-key="[13, 9]"
    @focus="openedMenu = true"
    @tags-changed="newTags => tags = newTags"
    add-only-from-autocomplete
  ></vue-tags-input>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "TagSearch",
  components: {
    VueTagsInput
  },
  computed: {
    showingClasses() {
      return this.$store.state.showingClasses;
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return (
          i.text.toLowerCase().indexOf((this.tag + "").toLowerCase()) !== -1 &&
          !this.showingClasses.hasOwnProperty(this.tag)
        );
      });
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
    tags(val) {
      this.$store.dispatch("filterClasses", val);
    }
  },
  data() {
    return {
      openedMenu: false,
      tag: "",
      autocompleteItems: [
        { text: "assassin" },
        { text: "blademaster" },
        { text: "brawler" },
        { text: "elementalist" },
        { text: "guardian" },
        { text: "gunslinger" },
        { text: "knight" },
        { text: "ranger" },
        { text: "shapeshifter" },
        { text: "sorcerer" }
      ]
    };
  },
  mounted() {
    const self = this;

    window.addEventListener("mousedown", function(e) {
      if (!e.target.closest(".vue-tags-input")) self.openedMenu = false;
    });
  }
};
</script>



        

<template>
  <section class="ti-container">
    <article class="ti-search-container"></article>
    <article class="ti-tags-container">
      <ul class="ti-tags">
        <li v-for="t in tags" :key="t.text" class="ti-tag">{{t.text}}</li>
      </ul>
    </article>
    <article v-show="showMenu" class="tag-menu-container">
      <ul class="ti-menu" v-if="menuItems.length">
        <li v-for="t in menuItems" :key="t.text" class="ti-menu-item">{{t.text}}</li>
      </ul>
      <ul class="ti-menu" v-else>
        <li class="ti-menu-empty">No Results Found</li>
      </ul>
    </article>
  </section>
</template>

<style lang="scss">
  $background-color: #424242;
  $background-color-1: lighten($background-color, 10%);
  $background-color-2: lighten($background-color, 20%);
  $background-color-3: lighten($background-color, 30%);
  $background-color-4: lighten($background-color, 40%);
  $background-color-5: lighten($background-color, 50%);



.ti-container {
  flex-grow: 1;
  background-color: $background-color !important;
  box-shadow: 0px 3px 1px -1px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;

  > .ti-tags-container {
    height: 100%;
    max-width: 100%;
    position: relative;

    > .ti-tags {
      position: absolute;
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      max-width: 99%;
      overflow: hidden;

      > .ti-tag {
        font-size: 13px;
        position: relative;
        background-color: $background-color-3;
        margin: auto 5px;
        padding: 5px;
        color: #fff;
        height: 80%;
        justify-content: center;
        display: flex;
        align-items: center;
        border-radius: 2px;

        &::first-letter {
          text-transform: uppercase !important;
        }
      }
    }
  }

  > .tag-menu-container {
    > .ti-menu {
      padding: 5px;
      margin: 0;
      list-style: none;
      background-color: $background-color !important;
      border: 1px solid $background-color-1;
      
      > .ti-menu-empty {
        padding: 5px;
        font-size: 13px;
      }

      > .ti-menu-item {
        padding: 5px;
        border-bottom: 1px solid $background-color-1;
        font-size: 13px;

        &:first-letter { 
          text-transform: uppercase;
        }
        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: $background-color-3;          
        }
      }
    }
  }
}
</style>


<script>
export default {
  name: "TagDropdown",
  props: ["tags"],
  methods: {
    tagsContainer: function() {
      this.showMenu = !this.showMenu;
    }
  },
  data() {
    return {
      showMenu: false,
      tagsClone: [],
      menuItems: [],
    }
  },
  mounted() {
    const self = this;
    
    self.tagsClone = self.tags;

    window.addEventListener("mousedown", function(e) {
      if (!e.target.closest(".ti-container")) self.showMenu = false;
      else self.showMenu = true;
    });
  }
};
</script>
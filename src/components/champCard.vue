<template>
  <v-flex
    :id="item.id"
    @click="filterItems($event)"
    :data-name="item.display_name"
    class="item-container"
    xs12
    sm6
    md4
  >
    <v-card hover>
      <v-card-title primary-title class="item-card">
        <div
          class="item-img"
          :style="'background: url(//ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/'+item.display_name+'.png) no-repeat; background-size: contain'"
        ></div>
        <p
          v-if="item.stats && item.item_type === 'basic'"
          class="title font-weight-medium"
        >{{ item.display_name }}</p>

        <p class="title font-weight-medium">{{ item.display_name }}</p>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import store from "../store";

export default {
  name: "ItemCard",
  methods: {
    filterItems: (event, name) => {
      store.dispatch("filterItems", { event, name });
    }
  },
  props: ["item", "comboOne", "comboTwo"]
};
</script>
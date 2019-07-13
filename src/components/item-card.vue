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
        <div class="item-img" :style="'background: url('+item.icon_img+') no-repeat;'"></div>
        <p
          v-if="item.stats && item.item_type === 'basic'"
          class="title font-weight-medium"
        >{{ item.display_name }}</p>
        <v-flex v-if="item.stats && item.item_type === 'basic'" class="item-stat">
          <p class="font-weight-medium">{{ item.stats.stat_type }}</p>
          <p class="font-weight-medium">{{ item.stats.bonus_amt }}</p>
        </v-flex>

        <v-layout v-if="item.item_type === 'combined'" row class="item-info">
          <v-flex>
            <p class="title font-weight-medium">{{ item.display_name }}</p>
            <p class="font-weight-light">{{ item.description }}</p>
            <div class="item-combo-container">
              <img
                class="combo-item-img"
                :src="comboOne.icon_img"
                @click.stop="filterItems($event, comboOne.display_name)"
              />

              <span class="plus">+</span>

              <img
                class="combo-item-img"
                :src="comboTwo.icon_img"
                @click.stop="filterItems($event, comboTwo.display_name)"
              />
            </div>
          </v-flex>
        </v-layout>
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
<template>
  <section class="item-container">
    <v-card>
      <v-card-title primary-title class="item-card">
        <div
          class="champ-img"
          :style="'background: url(//ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/'+ champName +'.png) no-repeat; margin-right: 5px;'"
        ></div>
        <div class="title font-weight-medium champClassInfo">
          <div style="display: flex;">
            <v-img src="/gold.png" style="width: 22px; height: 15px;"></v-img> 
            <span>{{ champions[champName].cost }}</span>
          </div>
          <span>{{ champions[champName].name }}</span>
        </div>
      </v-card-title>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "champCard",
  props: ["champName"],
  computed: {
    champions() {
      return this.$store.state.champions;
    },
  }
};
</script>


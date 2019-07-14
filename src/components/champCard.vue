<template>
  <section class="item-container">
    <v-card hover>
      <v-card-title primary-title class="item-card">
        <div
          class="champ-img"
          :style="'background: url(//ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/'+ champName +'.png) no-repeat;'"
        ></div>
        <p class="title font-weight-medium">{{ champName }}</p>
      </v-card-title>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "champCard",
  props: ["champName"]
};
</script>

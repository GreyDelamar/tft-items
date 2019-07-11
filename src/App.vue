<template>
  <v-app dark>
    <v-flex xs12>
      <v-text-field
        label="Solo"
        placeholder="Placeholder"
        solo
      ></v-text-field>
    </v-flex>
    <v-container grid-list-md text-xs-center fluid>
      <h2 class="section-title">Base Items</h2>
      <v-layout row wrap>
        <v-flex v-for="item in items" :key="item.id" sm4>
          <v-card hover >
            <v-card-title primary-title class="item-card">
              <div class="item-img" :style="'background: url('+item.icon_img+')'"></div>
              <p class="title font-weight-medium">{{ item.display_name }}</p>
              <v-flex v-if="item.stats" class="item-stat">
                <p class="font-weight-medium">{{ item.stats.stat_type }}</p>
                <p class="font-weight-medium">{{ item.stats.bonus_amt }}</p>
              </v-flex>
            </v-card-title>
            <v-card-actions class="item-card-actions">
              <v-spacer></v-spacer>
              <v-btn icon @click="show($event, item.id)">
                <v-icon>{{ item.showing ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="item.showing">
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md text-xs-center fluid>
      <h2 class="section-title">Combined Items</h2>
      <v-layout row wrap>
        <v-flex v-for="item in combined_items" :key="item.id" sm4>
          <v-card hover >
            <v-card-title primary-title class="item-card">
              <div class="item-img" :style="'background: url('+item.icon_img+')'"></div>
              <p class="title font-weight-medium">{{ item.display_name }}</p>
              <v-flex v-if="item.stats" class="item-stat">
                <p class="font-weight-medium">{{ item.stats.stat_type }}</p>
                <p class="font-weight-medium">{{ item.stats.bonus_amt }}</p>
              </v-flex>
            </v-card-title>
            <v-card-actions class="item-card-actions">
              <v-spacer></v-spacer>
              <v-btn icon @click="show($event, item.id)">
                <v-icon>{{ item.showing ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="item.showing">
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="scss">
  .section-title {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px #000 solid;
  }

  .item-img {
    border-radius: 10px;
    height: 64px;
    width: 64px;
  }

  .item-card {
    justify-content: space-between;
    padding-bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
  }

  .item-card .title {
    margin-bottom: 5px;
    font-size: 18px !important;
  }

  .item-card-actions {
    padding-bottom: 0;
  }

  .item-stat {
    flex: none;
    width: 80px;
  }

  .item-stat p {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .item-stat p:nth-child(2) {
    font-size: 18px;
  }
  
</style>

<script>

export default {
  name: 'App',
  methods: {
    show: function (e, id) {
      let item = this.items.filter(v => v.id && (v.id === id));
      
      if (item.length) {
        item = item[0];
        item.showing = !item.showing;
      }
    }
  },
  data () {
    return {
      "items": [
          {"showing": false, "id": "bf_sword", "display_name": "B.F. Sword", "stats": {"stat_type": "Attack Dmg", "bonus_amt": 20, "inc_type": "int"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1038.png"},
          {"showing": false, "id": "needlessly_large_rod", "display_name": "Needlessly Large Rod", "stats": {"stat_type": "Spell Dmg", "bonus_amt": 20, "inc_type": "percent"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1058.png"},
          {"showing": false, "id": "recurve_bow", "display_name": "Recurve Bow", "stats": {"stat_type": "Attack Speed", "bonus_amt": 20, "inc_type": "percent"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1043.png"},
          {"showing": false, "id": "spatula", "display_name": "Spatula", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}, "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/8.png"},
          {"showing": false, "id": "tear_of_goddess", "display_name": "Tear Of Goddess", "stats": {"stat_type": "Mana", "bonus_amt": 20, "inc_type": "int"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3070.png"},
          {"showing": false, "id": "giants_belt", "display_name": "Giant's Belt", "stats": {"stat_type": "Health", "bonus_amt": 20, "inc_type": "int"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1011.png"},
          {"showing": false, "id": "chain_vest", "display_name": "Chain Vest", "stats": {"stat_type": "Armor", "bonus_amt": 20, "inc_type": "int"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1031.png"},
          {"showing": false, "id": "negatron_cloak", "display_name": "Negatron Cloak", "stats": {"stat_type": "Magic Resist", "bonus_amt": 20, "inc_type": "int"}, "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/1057.png"}
      ],
      "combined_items": [
          {"id": "force_of_nature", "display_name": "Force Of Nature", "combos": ["spatula", "spatula"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/4401.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "guinsoos_rageblade", "display_name": "Guinsoos Rageblade", "combos": ["needlessly_large_rod", "recurve_bow"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3124.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "phantom_dancer", "display_name": "Phantom Dancer", "combos": ["chain_vest", "recurve_bow"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3046.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "rabadons_deathcap", "display_name": "Rabadons Deathcap", "combos": ["needlessly_large_rod", "needlessly_large_rod"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3089.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "rapid_firecannon", "display_name": "Rapid Firecannon", "combos": ["recurve_bow", "recurve_bow"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3094.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "spear_of_shojin", "display_name": "Spear Of Shojin", "combos": ["bf_sword", "tear_of_goddess"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3161.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "bloodthirster", "display_name": "Bloodthirster", "combos": ["bf_sword", "negatron_cloak"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3072.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "frozen_heart", "display_name": "Frozen Heart", "combos": ["chain_vest", "tear_of_goddess"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3110.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "frozen_mallet", "display_name": "Frozen Mallet", "combos": ["giants_belt", "spatula"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3022.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "locket_of_iron_solari", "display_name": "Locket Of Iron Solari", "combos": ["chain_vest", "needlessly_large_rod"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3190.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "morellonomicon", "display_name": "Morellonomicon", "combos": ["giants_belt", "needlessly_large_rod"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3165.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "seraphs_embrace", "display_name": "Seraphs Embrace", "combos": ["tear_of_goddess", "tear_of_goddess"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3040.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "titanic_hydra", "display_name": "Titanic Hydra", "combos": ["recurve_bow", "giants_belt"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3748.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "zephyr", "display_name": "Zephyr", "combos": ["negatron_cloak", "giants_belt"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3172.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "guardian_angel", "display_name": "Guardian Angel", "combos": ["bf_sword", "chain_vest"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3026.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "hextech_gunblade", "display_name": "Hextech Gunblade", "combos": ["bf_sword", "needlessly_large_rod"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3146.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "infinity_edge", "display_name": "Infinity Edge", "combos": ["bf_sword", "bf_sword"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3031.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "ludens_echo", "display_name": "Ludens Echo", "combos": ["tear_of_goddess", "needlessly_large_rod"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3285.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "redemption", "display_name": "Redemption", "combos": ["tear_of_goddess", "giants_belt"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3107.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "runaans_hurricane", "display_name": "Runaan's Hurricane", "combos": ["negatron_cloak", "spatula"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3085.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "statikk_shiv", "display_name": "Statikk Shiv", "combos": ["recurve_bow", "tear_of_goddess"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3087.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "sword_of_the_divine", "display_name": "Sword Of The Divine", "combos": ["bf_sword", "recurve_bow"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3131.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "thornmail", "display_name": "Thornmail", "combos": ["chain_vest", "chain_vest"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3075.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "warmogs_armor", "display_name": "Warmog's Armor", "combos": ["giants_belt", "giants_belt"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3083.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "dragons_claw", "display_name": "Dragons Claw", "combos": ["negatron_cloak", "negatron_cloak"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/66.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "sword_breaker", "display_name": "Sword Breaker", "combos": ["chain_vest", "negatron_cloak"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/56.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "darkin", "display_name": "Darkin", "combos": ["spatula", "tear_of_goddess"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/48.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "red_buff", "display_name": "Red Buff", "combos": ["chain_vest", "giants_belt"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/57.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "yuumi", "display_name": "Yuumi", "combos": ["spatula", "needlessly_large_rod"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/38.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "knights_vow", "display_name": "Knight's Vow", "combos": ["spatula", "chain_vest"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/58.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "hush", "display_name": "Hush", "combos": ["tear_of_goddess", "negatron_cloak"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/46.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "ionic_spark", "display_name": "Ionic Spark", "combos": ["negatron_cloak", "needlessly_large_rod"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/36.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "cursed_blade", "display_name": "Cursed Blade", "combos": ["recure_bow", "negatron_cloak"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/26.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "zekes_herald", "display_name": "Zeke's Herald", "combos": ["giants_belt", "bf_sword"], "icon_img": "//cdn.leagueofgraphs.com/img/tft/items/17.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}},
          {"id": "blade_of_the_ruined_king", "display_name": "Blade Of The Ruined King", "combos": ["spatula", "recurve_bow"], "icon_img": "//ddragon.leagueoflegends.com/cdn/9.13.1/img/item/3153.png", "stats": {"stat_type": "", "bonus_amt": "NONE", "inc_type": ""}}
      ],
    }
  },
  mounted () {
    this.show();
  }
}
</script>

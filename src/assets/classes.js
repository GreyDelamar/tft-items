export default {
    "assassin": {
        "name": "Assassin",
        "description": "Assassins leap to the farthest enemy at the start of combat and deal additional Critical Strike Damage",
        "bonuses": [
            {
                "needed": 3,
                "effect": "+150% critical strike damage"
            },
            {
                "needed": 6,
                "effect": "+350% critical strike damage"
            }
        ]
    },
    "blademaster": {
        "name": "Blademaster",
        "description": "Blademasters have a 35% chance to strike additional times each attack",
        "bonuses": [
            {
                "needed": 3,
                "effect": "One additional strike"
            },
            {
                "needed": 6,
                "effect": "Two additional strikes"
            }
        ]
    },
    "brawler": {
        "name": "Brawler",
        "description": "Brawlers receive bonus maximum health",
        "bonuses": [
            {
                "needed": 2,
                "effect": "+300 Bonus health"
            },
            {
                "needed": 4,
                "effect": "+700 Bonus health"
            }
        ]
    },
    "elementalist": {
        "name": "Elementalist",
        "description": "Elementalists gain double mana from attacks",
        "bonuses": [
            {
                "needed": 3,
                "effect": "At the start of combat, summon an Elemental"
            }
        ]
    },
    "guardian": {
        "name": "Guardian",
        "description": "Adjacent allies receive bonus armor",
        "bonuses": [
            {
                "needed": 2,
                "effect": "Adjacent allies receive armor +30 Armor"
            }
        ]
    },
    "gunslinger": {
        "name": "Gunslinger",
        "description": "After attacking, Gunslingers have a 50% chance to fire additional attacks",
        "bonuses": [
            {
                "needed": 2,
                "effect": "Attack another random enemy"
            },
            {
                "needed": 4,
                "effect": "Attack all enemies in range"
            }
        ]
    },
    "knight": {
        "name": "Knight",
        "description": "Knights block damage from basic attacks",
        "bonuses": [
            {
                "needed": 2,
                "effect": "20 damage blocked"
            },
            {
                "needed": 4,
                "effect": "40 damage blocked"
            },
            {
                "needed": 6,
                "effect": "80 damage blocked"
            }
        ]
    },
    "ranger": {
        "name": "Ranger",
        "description": "Rangers have a chance to double their attack speed for the next 3s",
        "bonuses": [
            {
                "needed": 2,
                "effect": "25% chance to double attack speed"
            },
            {
                "needed": 4,
                "effect": "65% chance to double attack speed"
            }
        ]
    },
    "shapeshifter": {
        "name": "Shapeshifter",
        "description": "Shapeshifters gain bonus maximum Health when they transform",
        "bonuses": [
            {
                "needed": 3,
                "effect": "+100% bonus max health"
            }
        ]
    },
    "sorcerer": {
        "name": "Sorcerer",
        "description": "Sorcerers gain double mana from attacking and allies have increased spell damage",
        "bonuses": [
            {
                "needed": 3,
                "effect": "+35% spell damage"
            },
            {
                "needed": 6,
                "effect": "+100% spell damage"
            }
        ]
    }
}
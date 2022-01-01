addLayer("genericLayer", {
    name: "Generic Layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "generic points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    clickables: {
      11: {
      title: "Generic clickable",
        canClick() {return true},
        onClick() {player[this.layer].points = player[this.layer].points.add(1)},
        display() {return "Wow, this sure is fun!"},
      },
      12: {
      title: "Thanks for the idea!",
        canClick() {return true},
        onClick() {player.points = player.points.add(0.1)},
        display() {return "dO NoT UsE ThEsE To mAkE ThInGs tHaT YoU ClIcK RePeAtEdLy fOr a bOnUs bEcAuSe tHoSe aRe aWfUl."},
        unlocked() {if (hasUpgrade("genericLayer", 23)) {return true}}
      }
},
upgrades: {
    11: {
        title: "The most patience any player will have starting any idle game.",
        description: "adds 100 generic points/sec because funny inflation lol",
        unlocked() {if (player[this.layer].points.gte(10)) {return true}; if (hasUpgrade("genericLayer", 11)) {return true}},
        cost: new Decimal(100)
    },
    12: {
        title: "Good upgrade 1",
        description: "Unlocks the next upgrade.",
        unlocked() {if (hasUpgrade("genericLayer", 11)) {return true}},
        cost: new Decimal(1)
    },
    13: {
        title: "Good upgrade 2",
        description: "Unlocks the next upgrade.",
        unlocked() {if (hasUpgrade("genericLayer", 12)) {return true}},
        cost: new Decimal(1)
    },
    14: {
        title: "Good upgrade 3",
        description: "Unlocks the next upgrade.",
        unlocked() {if (hasUpgrade("genericLayer", 13)) {return true}},
        cost: new Decimal(1)
    },
    15: {
        title: "Good upgrade 4",
        description: "Unlocks the next upgrade.",
        unlocked() {if (hasUpgrade("genericLayer", 14)) {return true}},
        cost: new Decimal(1)
    },
    21: {
        title: "Good upgrade 5",
        description: "Unlocks the next upgrade.",
        unlocked() {if (hasUpgrade("genericLayer", 15)) {return true}},
        cost: new Decimal(1)
    },
    22: {
        title: "Bad upgrade 6",
        description: "Uno reverses your points.",
        unlocked() {if(hasMilestone("aca", 1)) {return false} else if (hasUpgrade("genericLayer", 23)) {return false} else if (hasUpgrade("genericLayer", 21)) {return true}},
        cost: new Decimal(1),
        onPurchase() {alert("reset your game lol"); player.genericLayer.points = new Decimal(0)}
    },
    23: {
        title: "Good upgrade 6",
        description: "Unlocks new content.",
        unlocked() {if (hasUpgrade("genericLayer", 21)) {return true}},
        cost: new Decimal(1)
    },
    24: {
        title: "Wait, that wasn't a joke?",
        description: "Gains 0.01 points/sec.",
        unlocked() {if (hasUpgrade("genericLayer", 23)) {return true}},
        cost: new Decimal(1000000)
    },
    25: {
        title: "haha bonuses go brrr",
        description: "Multiplies points effect by 5.",
        unlocked() {if (hasUpgrade("genericLayer", 24)) {return true}},
        cost: new Decimal(1e7)
    },
    26: {
        title: "I got bored.",
        description: "Gains 10 points/sec.",
        unlocked() {if (hasUpgrade("genericLayer", 25)) {return true}},
        cost: new Decimal(5e7)
    }
},
update(diff) {
  if(hasUpgrade("genericLayer", 11)) player.genericLayer.points = player.genericLayer.points.add(100)
  if(hasUpgrade("genericLayer", 22)) player.genericLayer.points = player.genericLayer.points.sub(200)
  player.genericLayer.points = player.genericLayer.points.add(player.points.mul(100))
  if(hasUpgrade("genericLayer", 24)) player.points = player.points.add(0.01)
  if(hasUpgrade("genericLayer", 25)) player.genericLayer.points = player.genericLayer.points.add(player.points.mul(400))
  if(hasUpgrade("genericLayer", 26)) player.points = player.points.add(10)
},
    hotkeys: [

    ],
    infoboxes: {
    start: {
        title: "Information",
        body() { return "Welcome to The Trolling Tree! If you don't already know what to expect, then... well... *hehe*<br>Oh, and this mod can open external web pages in a new tab at times, just a heads up. Also join the Discord which I <i>totally</i> made." },
    },
},
doReset(resettingLayer) {
player.aca.totalPoints = player.aca.totalPoints.add(1) //change this upon next update when the Acamaeda Tears don't get softcapped.
layerDataReset("genericLayer")
acaMilestoneKeep() //function located in "utils/easyAccess.js"
if(hasUpgrade("aca", 12)) player.points = player.points.add(3)
},

    layerShown(){return true}
})
addLayer("aca", {
      name: "Acamaeda's Tears",
      symbol: "AC",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        totalPoints: new Decimal(0)
    }},

    color: "#8fa140",                       // The color for this layer, which affects many elements.
    resource: "Acamaeda's Tears",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "generic points",         // The name of the resource your prestige gain is based on.
    baseAmount() { return player.genericLayer.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(2147483647),      // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                            // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(0.5)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {
    if (player.genericLayer.points.gte(1e8)) {return true}
    else if(hasMilestone("aca", 0)) {return true}
    else return false
  },          // Returns a bool for if this layer's node should be visible in the tree.
  milestones: {
      0: {
          requirementDescription: "The first actually useful one.",
          effectDescription: "Keep the first upgrade.",
          done() { return player[this.layer].totalPoints.gte(1) },
          onComplete() {acaMilestoneKeep()}
      },
      1: {
          requirementDescription: "The second actually useful one.",
          effectDescription: "Keep the first \"good\" upgrade, and remove \"Bad upgrade 6\".",
          done() { return player[this.layer].totalPoints.gte(2) },
          onComplete() {acaMilestoneKeep()}
      },
      2: {
          requirementDescription: "The first useless one.",
          effectDescription: "Keep the second \"good\" upgrade.<br>Hope you like repetition.",
          done() { return player[this.layer].totalPoints.gte(3) },
          onComplete() {acaMilestoneKeep()}
      },
      3: {
          requirementDescription: "The second useless one.",
          effectDescription: "Keep the third \"good\" upgrade.<br>haha scrolling go brrr",
          done() { return player[this.layer].totalPoints.gte(4) },
          onComplete() {acaMilestoneKeep()}
      },
      4: {
          requirementDescription: "The third useless one.",
          effectDescription: "Keep the fourth \"good\" upgrade.<br>Why are you reading these descriptions?",
          done() { return player[this.layer].totalPoints.gte(5) },
          onComplete() {acaMilestoneKeep()}
      },
      5: {
          requirementDescription: "The fourth useless one.",
          effectDescription: "Keep the fifth \"good\" upgrade.<br>At least these are based on <i>total</i> Acamaeda Tears instead of current ones.",
          done() { return player[this.layer].totalPoints.gte(6) },
          onComplete() {acaMilestoneKeep()}
      },
      6: {
          requirementDescription: "The last useless one.",
          effectDescription: "Keep the sixth \"good\" upgrade.<br>This was <i>very</i> \"\"\"fun\"\"\".",
          done() { return player[this.layer].totalPoints.gte(7) },
          onComplete() {acaMilestoneKeep()}
      },
      7: {
          requirementDescription: "After a major reset, the game should be sped up from the start (not something that takes a long time to kick in).",
          effectDescription: "no<br>(Keep the eighth upgrade.)",
          done() { return player[this.layer].totalPoints.gte(8) },
          onComplete() {acaMilestoneKeep()}
      },
      8: {
          requirementDescription: "...rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          effectDescription: "haha qol go brrrrr<br>(Keep the ninth upgrade.)",
          done() { return player[this.layer].totalPoints.gte(9) },
          onComplete() {acaMilestoneKeep()}
      },
      9: {
          requirementDescription: "I got bored with the milestones too.",
          effectDescription: "I was gonna make an interesting description, but then I got bored.<br>(Keep the tenth upgrade.)",
          done() { return player[this.layer].totalPoints.gte(10) },
          onComplete() {acaMilestoneKeep()}
      },
//Make 8 more milestones for keeping previous upgrades.
/*
================================================================================
GO TO "utils > easyAccess.js", THEN SCROLL DOWN TO IMPLEMENT KEEPING UPGRADES!
================================================================================
*/
  },
    upgrades: {
      11: {
          title: "Do something else",
          description: "You go down a (figurative) rabbit hole in real life, and unlock a new upgrade.",
          unlocked() {if (player[this.layer].points.gte(1)) {return true} else if (hasUpgrade("aca", 11)) {return true}},
          cost: new Decimal(1),
          onPurchase() {window.open("https://www.homestuck.com/story")}
      },
      12: {
          title: "Lose faith in humanity",
          description: "Play a <i>certain mod</i> (totally not this one) that makes you realize how dumb people can really be. <br>Also start with three <b>องคชาต</b> (\"\"\"points\"\"\") whenever you reset for Acamaeda Tears.",
          unlocked() {if (hasUpgrade("aca", 11)) {return true}; },
          cost: new Decimal(1),
          onPurchase() {player.points = player.points.add(3)}
      },
      13: {
          title: "HOMOSUCK",
          description: "Gain 1.1x generic points for every (total) Acamaeda Tears.",
          unlocked() {if (hasUpgrade("aca", 12)) {return true}; },
          cost: new Decimal(3),
      },
      14: {
          title: "Homestuck^2 gets cancelled.",
          description: "Buy max Acamaeda Tears. Coming soon<sup>TM</sup>.",
          unlocked() {if (hasUpgrade("aca", 13)) {return true}; },
          cost: new Decimal(88888888), //Will be 6 points if I ever get around to making it.
          onPurchase() {alert("sussy hacker boi")}
      }
    },
    infoboxes: {
    start: {
        title: "Information",
        body() { return "You can't buy multiple Acamaeda's Tears at once. Why? Because grinding is \"\"\"fun\"\"\".<br>Additionally, every milestone requires one previous (total) Acamaeda tear than the last. <s>Don't</s> have fun with this layer!" },
    },
},
update(diff) {
if(hasUpgrade("aca", 13)) {
  if(hasUpgrade("genericLayer", 11)) player.genericLayer.points = player.genericLayer.points.add(new Decimal(100).mul(player.aca.totalPoints.div(10)))
  if(hasUpgrade("genericLayer", 25)) player.genericLayer.points = player.genericLayer.points.add(player.points.mul(new Decimal(400).mul(player.aca.totalPoints.div(10))))
}
}
})

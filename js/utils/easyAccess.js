function hasUpgrade(layer, id) {
	return ((player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasMilestone(layer, id) {
	return ((player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasAchievement(layer, id) {
	return ((player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasChallenge(layer, id) {
	return ((player[layer].challenges[id]) && !tmp[layer].deactivated)
}

function maxedChallenge(layer, id) {
	return ((player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit) && !tmp[layer].deactivated)
}

function challengeCompletions(layer, id) {
	return (player[layer].challenges[id])
}

function getBuyableAmount(layer, id) {
	return (player[layer].buyables[id])
}

function setBuyableAmount(layer, id, amt) {
	player[layer].buyables[id] = amt
}

function addBuyables(layer, id, amt) {
	player[layer].buyables[id] = player[layer].buyables[id].add(amt)
}

function getClickableState(layer, id) {
	return (player[layer].clickables[id])
}

function setClickableState(layer, id, state) {
	player[layer].clickables[id] = state
}

function getGridData(layer, id) {
	return (player[layer].grid[id])
}

function setGridData(layer, id, data) {
	player[layer].grid[id] = data
}

function upgradeEffect(layer, id) {
	return (tmp[layer].upgrades[id].effect)
}

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
}

function clickableEffect(layer, id) {
	return (tmp[layer].clickables[id].effect)
}

function achievementEffect(layer, id) {
	return (tmp[layer].achievements[id].effect)
}

function gridEffect(layer, id) {
	return (gridRun(layer, 'getEffect', player[layer].grid[id], id))
}

//custom functions
function acaMilestoneKeep() {
  if(hasMilestone("aca", 0)) player.genericLayer.upgrades = [11]
  if(hasMilestone("aca", 1)) player.genericLayer.upgrades = [11, 12]
	if(hasMilestone("aca", 2)) player.genericLayer.upgrades = [11, 12, 13]
	if(hasMilestone("aca", 3)) player.genericLayer.upgrades = [11, 12, 13, 14]
	if(hasMilestone("aca", 4)) player.genericLayer.upgrades = [11, 12, 13, 14, 15]
	if(hasMilestone("aca", 5)) player.genericLayer.upgrades = [11, 12, 13, 14, 15, 21]
	if(hasMilestone("aca", 6)) player.genericLayer.upgrades = [11, 12, 13, 14, 15, 21, 23]
	if(hasMilestone("aca", 7)) player.genericLayer.upgrades = [11, 12, 13, 14, 15, 21, 23, 24]
	if(hasMilestone("aca", 8)) player.genericLayer.upgrades = [11, 12, 13, 14, 15, 21, 23, 24, 25]
	if(hasMilestone("aca", 9)) player.genericLayer.upgrades = [11, 12, 13, 14, 15, 21, 23, 24, 25, 26]
}

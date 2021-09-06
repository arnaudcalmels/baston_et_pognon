import store from '../store/store';

// Trouver un monstre parmi les places ou les wanderingMonsters
export const findMonster = (monsterId, scenarioId) => {
  const { scenario: { scenarios } } = store.getState();
  const currentScenario = scenarios.find(scenario => scenario.id === scenarioId);
  let currentMonster = {};
  let found = false;
  currentScenario.places?.forEach(place => place.monsters.forEach(monster => {
    if (monster.id === monsterId) {
      currentMonster = monster;
      found = true;
    }
  }));
  if (!found) {
    currentScenario.wanderingMonsters?.forEach(group => group.monsters.forEach(monster => {
      if (monster.id === monsterId) {
        currentMonster = monster;
      }
    }));
  }
  return currentMonster;
};

// Trouver le dernier monstre créé suivant son rattachement à une place ou un wanderingGroup
export const findNewMonster = (placeId, wanderGroupId, scenarioId) => {
  const { scenario: { scenarios } } = store.getState();
  let currentMonster = {};
  if (placeId) {
    const monsters = scenarios.find(scenario => scenario.id === scenarioId).places?.find(place => place.id === placeId).monsters;
    currentMonster = monsters[monsters.length-1];
  }
  if (wanderGroupId) {
    const monsters = scenarios.find(scenario => scenario.id === scenarioId).wanderingMonsters?.find(group => group.id === wanderGroupId).monsters;
    currentMonster = monsters[monsters.length-1];
  } 
  return currentMonster;
};

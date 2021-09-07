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
  } else if (wanderGroupId) {
    const monsters = scenarios.find(scenario => scenario.id === scenarioId).wanderingMonsters?.find(group => group.id === wanderGroupId).monsters;
    currentMonster = monsters[monsters.length-1];
  } else { //si le monstre appartient à un nouveau wanderingGroup
    const wanderingMonsters = scenarios.find(scenario => scenario.id === scenarioId).wanderingMonsters;
    console.log('wanderingMonsters');
    console.log(wanderingMonsters);
    const monsters = wanderingMonsters[wanderingMonsters.length-1].monsters;
    currentMonster = monsters[0];
    console.log('currentMonster');
    console.log(currentMonster);
  }
  return currentMonster;
};

// Trouver un lieu dans un scenario
export const findPlace = (placeId, scenarioId) => {
  const { scenario: { scenarios } } = store.getState();
  let currentPlace = scenarios.find(scenario => scenario.id === scenarioId).places?.find(place => place.id === placeId);
  return currentPlace;
};

// Trouver le dernier lieu créé
export const findNewPlace = (scenarioId) => {
  const { scenario: { scenarios } } = store.getState();
  let currentPlace = {};
  let places = scenarios.find(scenario => scenario.id === scenarioId).places;
  currentPlace = places[places.length-1];
  return currentPlace; 
};

import { 
  GET_SCENARIOS, GET_SCENARIOS_SUCCESS, NEW_SCENARIO, NEW_SCENARIO_SUCCESS, EDIT_SCENARIO, EDIT_SCENARIO_SUCCESS, DELETE_SCENARIO, SET_ITEM
} from './types';

export const getScenarios = () => ({
  type: GET_SCENARIOS,
});

export const getScenariosSuccess = (data) => ({
  type: GET_SCENARIOS_SUCCESS,
  data
});

export const newScenario = (values, redirect) => ({
  type: NEW_SCENARIO,
  values,
  redirect
});

export const newScenarioSuccess = (data) => ({
  type: NEW_SCENARIO_SUCCESS,
  data
});

export const editScenario = (id, values, closeFunction, redirect) => ({
  type: EDIT_SCENARIO,
  id,
  values,
  closeFunction,
  redirect
});

export const editScenarioSuccess = (data) => ({
  type: EDIT_SCENARIO_SUCCESS,
  data,
});

export const deleteScenario = (id, redirect) => ({
  type: DELETE_SCENARIO,
  id,
  redirect
});

export const setItem = (data, itemType) => ({
  type: SET_ITEM,
  data,
  itemType
});

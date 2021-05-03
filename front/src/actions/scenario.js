import { 
  GET_SCENARIOS, GET_SCENARIOS_SUCCESS, NEW_SCENARIO, NEW_SCENARIO_SUCCESS, EDIT_SCENARIO, EDIT_SCENARIO_SUCCESS
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

export const editScenario = (id, values) => ({
  type: EDIT_SCENARIO,
  id,
  values,
  
});

export const editScenarioSuccess = (data) => ({
  type: EDIT_SCENARIO_SUCCESS,
  data,
});

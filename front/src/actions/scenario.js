import { 
  GET_SCENARIOS, GET_SCENARIOS_SUCCESS
} from './types';

export const getScenarios = () => ({
  type: GET_SCENARIOS,
});

export const getScenariosSuccess = (data) => ({
  type: GET_SCENARIOS_SUCCESS,
  data
});

import toolHistorySlice from './toolHistorySlice';
import toolSlice from './toolSlice';

const actions = {
  ...toolSlice.actions,
  ...toolHistorySlice.actions,
};

const reducers = {
  toolsReducer: toolSlice.reducer,
  toolHistoryReducer: toolHistorySlice.reducer,
};

export { actions, reducers };

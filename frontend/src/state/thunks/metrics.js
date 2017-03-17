import { getDurationMilliseconds } from '../../utils/duration-interval';
import { refreshMetrics } from '../actions';

let timeoutId = null;

const tick = (dispatch) => {
  dispatch(refreshMetrics());
};

export const subscribe = (interval) => (dispatch) => {
  if(timeoutId) {
    clearTimeout(timeoutId);
  }
  const timeout = interval ?
    getDurationMilliseconds(interval) :
    120 * 1000;
  timeoutId = setTimeout(tick, timeout, dispatch);
};

export const unsubscribe = () => () => {
  if(timeoutId) {
    clearTimeout(timeoutId);
  }
};

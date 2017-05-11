import { getDurationMilliseconds } from '../../utils/duration-interval';
import { refreshMetrics } from '../actions';

let timeoutId = null;

const tick = (dispatch) => {
  dispatch(refreshMetrics());
};

export const subscribe = (interval) => (dispatch) => {
  if(timeoutId) {
    clearInterval(timeoutId);
  }
  const timeout = interval ?
    getDurationMilliseconds(interval) :
    120 * 1000;
  timeoutId = setInterval(tick, timeout, dispatch);
};

export const unsubscribe = () => () => {
  if(timeoutId) {
    clearInterval(timeoutId);
  }
};

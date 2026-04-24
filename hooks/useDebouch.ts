const useDebounce = (fn, delay) => {
  let timeoutId;
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn();
    }, delay);
    return timeoutId;
  };
};

export default useDebounce;
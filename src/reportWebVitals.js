const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry) {
    window.addEventListener('perf', () => onPerfEntry(performance.timing.entry));
  }
};

export default reportWebVitals;

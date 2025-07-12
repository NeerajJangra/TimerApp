export const getStatusColor = status => {
  switch (status) {
    case 'RUNNING':
      return '#28a745';
    case 'PAUSED':
      return '#ff9900';
    case 'COMPLETED':
      return '#007bff';
    default:
      return '#6c757d';
  }
};

export const groupTimersByCategory = timers => {
  const grouped = {};
  timers.forEach(timer => {
    const cat = timer.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(timer);
  });

  return grouped;
};
export const formatTime = seconds => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

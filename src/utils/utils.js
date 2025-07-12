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

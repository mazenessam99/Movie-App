// Format release date
export const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Format runtime (convert minutes to hours and minutes)
export const formatRuntime = (minutes) => {
  if (!minutes) return 'Not available';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  }
  return `${mins}m`;
};

// Format numbers (like votes count)
export const formatNumber = (num) => {
  if (!num) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format rating
export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return rating.toFixed(1);
};

// Get rating color
export const getRatingColor = (rating) => {
  if (rating >= 7.5) return '#4CAF50'; // Green
  if (rating >= 6.0) return '#FFC107'; // Yellow
  if (rating >= 4.0) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

// Convert runtime to short format
export const getShortRuntime = (minutes) => {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Extract year from date
export const getYear = (dateString) => {
  if (!dateString) return '';
  return dateString.split('-')[0];
};

// Truncate long text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

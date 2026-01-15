export function getDayType() {
  const day = new Date().getDay(); // 0 = Sunday
  return day === 0 || day === 6 ? 'holiday' : 'weekday';
}

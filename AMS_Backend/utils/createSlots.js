export const generateSlotsForNext7Days = () => {
  const days = [];
  const slotInterval = 60; // in minutes
  const startHour = 9;
  const endHour = 17;

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    const dateKey = currentDate.toISOString().split("T")[0]; // "2025-06-02"
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += slotInterval) {
        const timeStr = `${hour}:${min === 0 ? "00" : min}`;
        slots.push(timeStr); 
      }
    }

    days.push({
      date: dateKey,
      times: slots,
    });
  }

  return days;
};
export function generateEvents(patients) {
  return patients.map((patient) => {
    const [time, modifier] = patient.appointment.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // Get today's date
    const start = new Date();
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start.getTime() + 25 * 60000); // +25 minutes

    return {
      title: `${patient.name} - ${patient.checkup}`,
      start,
      end
    };
  });
}
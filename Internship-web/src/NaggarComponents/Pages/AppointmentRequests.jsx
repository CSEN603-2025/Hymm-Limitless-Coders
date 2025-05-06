import { useState } from "react";

export default function AppointmentRequests() {
  const [appointments, setAppointments] = useState([
    { id: 1, reason: "Career guidance", status: "pending" },
    { id: 2, reason: "Report clarification", status: "pending" },
  ]);

  const handleUpdate = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <div>
      <h2>Incoming Appointment Requests</h2>
      {appointments.map((appt) => (
        <div key={appt.id}>
          <p><strong>Reason:</strong> {appt.reason}</p>
          <p><strong>Status:</strong> {appt.status}</p>
          {appt.status === "pending" && (
            <>
              <button onClick={() => handleUpdate(appt.id, "accepted")}>
                Accept
              </button>
              <button onClick={() => handleUpdate(appt.id, "rejected")}>
                Reject
              </button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}
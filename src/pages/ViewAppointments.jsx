import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ViewAppointments() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/appointments");
    if (res?.data?.success) setData(res?.data?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete?",
      text: "This appointment will be deleted",
      icon: "warning",
      showCancelButton: true,
    });

    if (!ok.isConfirmed) return;

    const res = await api.delete(`/appointments/${id}`);
    if (res?.data?.success) {
      Swal.fire("Deleted", res?.data?.message || "Done", "success");
      fetchData();
    } else {
      Swal.fire("Error", res?.data?.message || "Failed", "error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card page-card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-primary fw-bold m-0">Appointments</h4>
          <Link to="/book" className="btn btn-sm btn-primary">
            + New
          </Link>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Dept</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.patientName}</td>
                  <td>{item.phone}</td>
                  <td>{item.doctorName}</td>
                  <td>{item.department}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td style={{ maxWidth: 220 }}>{item.reason}</td>
                  <td>
                    <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning me-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

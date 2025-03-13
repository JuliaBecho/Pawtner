import { useState } from "react";
import axios from "axios";

export function ReportItem({ report, onUpdate, onDelete }) {
  const [expandedReport, setExpandedReport] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editReport, setEditReport] = useState({ ...report });

  function toggleReportDetails(reportId) {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  }

  function handleEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    setEditMode(false);
    setEditReport({ ...report });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditReport((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    try {

      const url = import.meta.env.VITE_PAWTNERBACKEND;
      const response = await axios.put(
        `${url}/reports/${report.id}`,
        editReport
      );

      if (response.status === 200) {
        setEditMode(false);
        editReport; // Atualiza a lista de reports no componente pai
      }

      alert("Update successful!");
    } catch (error) {
      console.error("Erro on saving:", error);
      alert("Erro on saving alterations");
    }
  }

  return (
    <div
      className={`report-card ${
        expandedReport === report.id ? "expanded" : ""
      }`}
    >
      <div className="report-options">
        <button className="x" onClick={() => onDelete(report.id)}>
          ✖
        </button>
        <button className="edit-icon" onClick={handleEdit}>
          ✒️
        </button>
      </div>

      <div className="image-placeholder">
        <img src={report.imageUrl} alt="Animal Report" />
      </div>

      <div className="report-info">
        {editMode ? (
          <>
            <label>
              <strong>Type:</strong>
              <input
                type="text"
                name="type"
                value={editReport.type}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Animal:</strong>
              <input
                type="text"
                name="animal"
                value={editReport.animal}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Breed:</strong>
              <input
                type="text"
                name="breed"
                value={editReport.breed}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={editReport.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <strong>Description:</strong>
              <textarea
                name="description"
                value={editReport.description}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <>
            <p>
              <strong>Type:</strong> {report.type}
            </p>
            <p>
              <strong>Date:</strong> {report.date}
            </p>
            {expandedReport === report.id && (
              <>
                <p>
                  <strong>Animal:</strong> {report.animal}
                </p>
                <p>
                  <strong>Breed:</strong> {report.breed}
                </p>
                <p>
                  <strong>Email:</strong> {report.email}
                </p>
                <p>
                  <strong>Description:</strong> {report.description}
                </p>
              </>
            )}

            <button
              className="toggle-info2"
              onClick={() => toggleReportDetails(report.id)}
            >
              {expandedReport === report.id ? "Show Less" : "More Info"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

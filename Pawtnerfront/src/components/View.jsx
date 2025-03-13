import React, { useEffect, useState } from "react";
import "../styles/view.css";
import axios from "axios";
import { userFirebase } from "../context/FirebaseContext";
import AnimalMap from "./AnimalMap";
import { ReportItem } from "./ReportView";

export default function View() {
  const [reports, setReports] = useState([]); //State to store reports
  const { user } = userFirebase(); //Get the current authenticated user
  const [expandedReport, setexpandedReport] = useState(null);

  //Fetch reports from the backend when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:3000/reports"); // Fetch reports API
        setReports(data); //Update state with fetched data
      } catch (error) {
        alert("Something ent wrong");
        console.error(error);
      }
    }

    fetchData(); //Call the function
  }, []);


  function handleUpdate(updatedReport){
    setReports((prevReports)=>
      prevReports.map((r)=> (r.id === updatedReport.id ? updatedReport : r))
    );
  }

  //Handle report deletion
  async function handleDelete(reportId) {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        await axios.delete("http://localhost:3000/reports/" + reportId); //Delete report from API

        setReports(
          reports.filter((report) => {
            return report.id !== reportId; //Remove deleted report from state
          })
        );
      } catch (error) {
        alert("Something went wrong");
      }
    }
  }

  function toggleReportDetails(reportId) {
    setexpandedReport(expandedReport === reportId ? null : reportId);
  }

  function showUserReports() {
    const reportsFromUser = reports.filter(
      (report) => report.user_id === user?.uid
    );

    if (reportsFromUser.length > 0) {
      return reportsFromUser.map((report) => (
        <ReportItem
        report={report}
        key={report.id}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        />
      ));

    }
       
    return <p>There is nothing to show</p>;
  }

  return (
    <div className="view-container">
      <AnimalMap reports={reports} /> {/*Display map with reported locations */}
      {/*Display reports only if user is logged in */}
      {user && (
        <>
          <h2 className="view-title">My Reports</h2>

          <div className="reports-grid">{showUserReports(reports)}</div>
        </>
      )}
    </div>
  );
}

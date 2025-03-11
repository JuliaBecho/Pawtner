import React, { useEffect, useState } from "react"
import "../styles/view.css"
import axios from "axios";
import { userFirebase } from "../context/FirebaseContext";
import AnimalMap from "./AnimalMap";

export default function View(){
    const[reports, setReports] = useState([]);
    const {user} = userFirebase();

    useEffect(() => {
        async function fetchData() {
            try{
                const{data} = await axios.get("http://localhost:3000/reports")
                setReports(data); 
            }catch (error){
                alert("Something ent wrong")
                console.error(error);
            }
        }

        fetchData();
    }, []);

    async function handleDelete(reportId){
        if(confirm("Are you sure you want to delete this report?")){
            
            try {
            await axios.delete("http://localhost:3000/reports/"+ reportId);
            setReports(
                reports.filter((report) => {
                    return report.id !== reportId;
                })
            );
        }catch (error) {
            alert("Something went wrong")
        }}

       
    }

    return(

        <div className="view-container">
           <AnimalMap/>
           {user && (
            <>
            <h2 className="view-title">My Reports</h2>

            <div className="reports-grid">
                {reports.map((report) => (
                    <div key={report.id} className="report-card">

                        {
                            user && report.user_id === user.uid && (
                                <button className="x" onClick={() => handleDelete(report.id)}>✖</button>
                            )
                        }

                        <div className="image-placeholder">
                            <img src={report.imageUrl} />
                            </div> 
                        <div className="report-info">
                            <p><strong>Type:</strong>{report.type}</p>
                            <p><strong>Animal:</strong>{report.animal}</p>
                            <p><strong>Breed:</strong>{report.breed}</p>
                            <p><strong>Date:</strong>{report.date}</p>
                            <p><strong>Email:</strong>{report.email}</p>
                            <p><strong>Description:</strong>{report.description}</p>
                        </div>

                        </div>
                        
                ) )}
            </div>
            
            </>
           )}
            
        </div>
    );
}
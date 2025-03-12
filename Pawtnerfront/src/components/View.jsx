import React, { useEffect, useState } from "react"
import "../styles/view.css"
import axios from "axios";
import { userFirebase } from "../context/FirebaseContext";
import AnimalMap from "./AnimalMap";

export default function View(){
    const[reports, setReports] = useState([]); //State to store reports 
    const {user} = userFirebase();//Get the current authenticated user

    //Fetch reports from the backend when the component mounts 
    useEffect(() => {
        async function fetchData() {
            try{
                const{data} = await axios.get("http://localhost:3000/reports")// Fetch reports API 
                setReports(data); //Update state with fetched data 
            }catch (error){
                alert("Something ent wrong")
                console.error(error);
            }
        }

        fetchData(); //Call the function 
    }, []);

        //Handle report deletion 
    async function handleDelete(reportId){
        if(confirm("Are you sure you want to delete this report?")){
            
            try {
            await axios.delete("http://localhost:3000/reports/"+ reportId);//Delete report from API
            setReports(
                reports.filter((report) => {
                    return report.id !== reportId; //Rem,ove deleted report from state 
                })
            );
        }catch (error) {
            alert("Something went wrong")
        }}

       
    }

    function showUserReports(report){
        const reportsFromUser = reports.filter((report) => {
            return report.user_id === user.uid;
        });
        
        if(reportsFromUser.length>0){
            return reportsFromUser.map((report)=> (
                <div key={report.id} className="report-card">


              
                       
                         <button className="x" onClick={() => handleDelete(report.id)}>✖</button>
                            
                        

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
            ));
        }

        return <p>There is nothing to show</p>
        
    }


    return(

        <div className="view-container">
           <AnimalMap reports={reports}/> {/*Display map with reported locations */}

           {/*Display reports only if user is logged in */}
           {user && (
            <>
            <h2 className="view-title">My Reports</h2>

            <div className="reports-grid">

                {showUserReports(reports)}
            </div>
            
            </>
           )}
            
        </div>
    );
}
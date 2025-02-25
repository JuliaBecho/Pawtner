import React from "react"
import "../styles/view.css"

export default function View(){
    const reports = [
        {id: 1, type:"Lost", animal: "Dog", breed:"Labrador", date: "2025-02-24", email:"user@example", description: "Brown labrador lost near park"},
        {id: 2, type:"Found", animal: "Cat", breed:"Siamese", date: "2025-02-20", email:"user2@example", description: "Found a scared cat on my porch"},
        {id: 3, type:"Abuse", animal: "Dog", breed:"Bulldog", date: "2025-02-22", email:"user3@example", description: "Saw a mistreated dog in my neighborhood"},
        {id: 4, type:"Lost", animal: "Parrot", breed:"Macaw", date: "2025-02-21", email:"user4@example", description: "Colorful macaw flew away, last seen in backyard"},
    ];

    return(
        <div className="view-container">
            <h2 className="view-title">My Reports</h2>

            <div className="reports-grid">
                {reports.map((report) => (
                    <div key={report.id} className="report-card">
                        <div className="image-placeholder"></div> 
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
        </div>
    );
}
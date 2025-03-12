# Pawtner: Pet Support Platform

In many countries, stray animals and cases of animal abuse are common and often go unaddressed. Pawtner is a web-based platform designed to allow users to report **animal abuse** and **lost/found pets** efficiently. The platform integrates **Google Maps API** to enable precise location reporting and **Firebase** for authentication and data management.

## **Core Features**
1. **Report Animal Abuse**  
   - Users can report cases of animal abuse with details like location, description, and images.
   - The reports appear on an **interactive map** for community awareness.

2. **Report Lost and Found Animals**  
   - Users can report lost or found animals, helping to reunite pets with their owners.
   - Reports include images, breed, and last known location.

3. **View Reports on an Interactive Map**  
   - Users can see all reports plotted on **Google Maps**.
   - Clicking on a marker opens a **detailed view** with an expandable info window.

4. **Anonymous or Authenticated Reporting**  
   - Users **can submit reports anonymously**.
   - Logged-in users (via **Firebase Authentication**) can manage and delete their own reports.

5. **Modern UI with React**  
   - Fully responsive and optimized for a seamless user experience.
   - **Dark mode support**.

## **Technologies Used**
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, Firebase Firestore
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Maps API:** Google Maps JavaScript API (@vis.gl/react-google-maps)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Deployment:** Firebase Hosting (optional)
- **Development Tools:** Postman, VS Code, Git/GitHub

---

## **Frontend Implementation**
The frontend is built with React and uses @vis.gl/react-google-maps for map integration.

**Google Maps Integration**
```javascript
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function ReportMap({ updateLocationOnForm }) {
    const handleMapClick = (event) => {
        if (event.detail) {
            const { lat, lng } = event.detail.latLng;
            updateLocationOnForm(lat, lng);
        }
    };

    return (
        <div className="map-container">
            <APIProvider apiKey={import.meta.env.VITE_ANIMALMAP}>
                <Map
                    defaultCenter={{ lat: 49.282729, lng: -123.120738 }}
                    defaultZoom={12}
                    onClick={handleMapClick}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </div>
    );
}
```
**Interactive Report Cards with Expandable Info**

```javascript
import { useState } from "react";

export default function ReportCard({ report }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`report-card ${expanded ? "expanded" : ""}`}>
            <img src={report.imageUrl} alt="Animal" />
            <p><strong>Type:</strong> {report.type}</p>
            <p><strong>Date:</strong> {report.date}</p>
            
            {expanded && (
                <>
                    <p><strong>Animal:</strong> {report.animal}</p>
                    <p><strong>Description:</strong> {report.description}</p>
                </>
            )}

            <button onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "More Info"}
            </button>
        </div>
    );
}

```


## **Backend Implementation**

The backend is built with Node.js + Express.js and connects to Firebase Firestore for data storage.

**API Endpoints**
| Method | Endpoint                | Description                                                                    |
|--------|-------------------------|--------------------------------------------------------------------------------|
| POST   | /reports                | 	Creates a new report, allowing image uploads. Requires authentication (token) |
| GET    | /reports                | 	Retrieves all reports stored in Firebase Firestore                            |
| DELETE | /reports/:id            |  Deletes a specific report by ID.                                              |


## CRUD operations:

## Users Table
| Action  | Description                                                   |
|---------|---------------------------------------------------------------|
| Create  | Add a new user when they sign up                              |
| Read    |	Retrieve user details using Firebase Authentication           |



## Reports Table
| Action  | Description                                                    |
|---------|----------------------------------------------------------------|
| Create  |Add a new report when a user submits one, allowing image uploads|
| Read    | Retrieve all reports to display on the map or in a list        |
| Delete  | Remove a report by ID (only for authenticated users)           |


## Animals Table
| Action  | Description                                                   |
|---------|---------------------------------------------------------------|
| Create  | Add a new animal when a report is submited                    |
| Read    | Retrieve animal details (included in reports)                 |
| Delete  | Remove an animal record                                       |



## **Development Instructions**
To run the Pawtner: Pet Support Platform, follow these setup steps:

1. **Prerequisites**
   - You must have a Firebase project configured with the following services enabled:
   -  Storage (for image uploads)
   -  Authentication (for user login and report ownership tracking)
   -  Firestore Database (to store reports)
     
✅ Google Maps API must be enabled in your Google Cloud Console to use location services.

✅ Install Node.js and npm before proceeding.


2. **Project Setup**
   
For both the frontend and backend, install dependencies by running:

```bash
npm install

```

6. **Database Configuration**
   
Pawtner stores reports in Firebase Firestore. The database should be structured as follows:

```bash
/reports
    ├── {reportId}
    │   ├── type: "lost" | "found" | "abuse"
    │   ├── animal: "Dog"
    │   ├── breed: "Beagle"
    │   ├── date: "YYYY-MM-DD"
    │   ├── email: "user@example.com"
    │   ├── location: { lat: 49.2827, lng: -123.1207 }
    │   ├── imageUrl: "https://storage.googleapis.com/bucket-name/uploads/animal.jpg"
    │   ├── user_id: "firebase_user_id"

```

4. **Frontend Setup**
   
✅ Steps to Start the Frontend:

 - Ensure that Google Maps API is enabled in Google Cloud Console.
 - Run the following command to start the development server:
```bash
npm run dev
```

5. **Backend Setup**

✅ Steps to Start the Backend:

 - Generate a Firebase Service Account JSON file, download it, and place it in the project root directory.
 - Run the following command to initialize the backend server:
```bash
npm run init
```






## Database Schema desing:

![image](https://github.com/user-attachments/assets/e5936586-21d6-4bef-9343-bf3d522390b0)


## Achiteture diagram:

![image](https://github.com/user-attachments/assets/44213c96-ef72-4131-9567-6a1594afc31c)

## The Google Maps API will be used for:

1.	Geolocation:
   
o	Allow users to select or view the location of a report (abuse, lost/found animal) on the map.
o	Display markers on the map for registered reports.



## Data Flow
1.	The user selects a location on the map.
2.	The frontend uses the Google Maps API to convert the address into coordinates (if necessary) and displays the location on the map.
3.	When the user submits a report, the coordinates are sent to the backend as part of the request body.
4.	The backend stores the coordinates in the database and associates them with the report.
5.	The frontend retrieves the coordinates from the backend and displays them on the map as markers.

## Limitations and Requirements
•	Usage Quota: The Google Maps API has daily request limits. Ensure that usage is monitored to avoid exceeding the quota and incurring additional costs.

•	API Key Security: The Google Maps API key must be kept secure and should not be exposed in public repositories or client-side code.

•	Error Handling: The frontend should handle errors related to the Google Maps API, such as failed geolocation requests or invalid API keys.


## Home page
On this page, there is a summary and photos of the Pawtner project and its purpose

![image](https://github.com/user-attachments/assets/06416222-3919-4357-8c93-0c3ad06d1b9b)



## Report page
On this page, users can report cases of animal abuse or lost pets 

![image](https://github.com/user-attachments/assets/fba8258c-367e-4bec-95d6-bdf211d8dd08)

## View reports
On this page, users can view reports


![image](https://github.com/user-attachments/assets/3b5753ce-7ec9-4e20-9ce8-fe09d286eaeb)



## Login page
Users can log into their account or create one. However, logging in is not required to submit reports, and they can choose to
remain anonymous. 


![image](https://github.com/user-attachments/assets/7db88765-cb7e-4b23-8cda-0cccee1e7bc9)





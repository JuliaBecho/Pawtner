# Pawtner: Pet Support plataform

In many countries, stray animals and cases of animal abuse are common and often go unaddressed. Stray animals lack shelter, food, and care, while abuse cases remain unreported due to the absence of accessible tools.

* Pawtner aims to solve this by:
1.	Reporting Animal Abuse: Allowing users to report abuse with details like location, description, and images, helping authorities or organizations to act.
2.	Lost and Found Animals: report lost or found animals by sharing descriptions and photos. This connects stray animals with their owners or rescue organizations for care and support.

Pawtner seeks to empower communities to act, ensuring a better response to animal welfare challenges and fostering a safer environment for animals in need.

## Overview of the Application’s Functionality:

Pawtner is a platform designed to support and protect stray and abused animals. Users will be able to:

 •	Report cases of animal abuse by providing detailed descriptions, attaching images/videos, and specifying the location using an interactive map.

 •	Report lost or found animals with features to describe the animal (e.g., species, breed, color) and upload photos for better identification.

 •	Access an interactive map where reports of lost, found, and abuse cases are displayed for better community response.

 •	Utilize a responsive and intuitive interface that includes features like dark mode and geolocation-based reporting.

## User stories:

1.	As a concerned citizen, I want to report cases of animal abuse so that authorities or organizations can intervene and take action.
2.	As a pet owner, I want to report my lost pet with detailed descriptions and photos so that the community can help me find it.
3.	As a rescuer, I want to report a stray animal I found and provide its location, description, and photos so that rescue organizations can assist.
4.	As a community member, I want to view reports of lost or abused animals on a map so that I can help or take necessary action.
5.	As a user, I want the app to have a responsive design and dark mode so that it is easy to use in all environments.\

## Database Schema desing:

![image](https://github.com/user-attachments/assets/e5936586-21d6-4bef-9343-bf3d522390b0)

## API endpoints:

| Method | Endpoint               | Description                                              |
|--------|-------------------------|----------------------------------------------------------|
| POST   | /api/reports            | Allows users to submit a report of animal abuse.         |
| GET    | /api/reports            | Retrieves a list of all abuse or lost/found animal reports. |
| GET    | /api/reports/{id}       | Retrieves details of a specific report by its ID.        |
| PUT    | /api/reports/{id}       | Updates an existing report.                              |
| DELETE | /api/reports/{id}       | Deletes a specific report.                               |
| POST   | /api/animals            | Allows users to report a lost or found animal.           |


## CRUD operations:

## Users Table
| Action  | Description                                                   |
|---------|---------------------------------------------------------------|
| Create  | Add a new user when they sign up                              |
| Read    | Retrieve user details for login or profile viewing            |
| Update  | Update user information                                       |
| Delete  | Remove a user account                                         |

## Reports Table
| Action  | Description                                                   |
|---------|---------------------------------------------------------------|
| Create  | Add a new report when a user submits one                      |
| Read    | Retrieve report for display on the map or in a list           |
| Update  | Edit report details                                           |
| Delete  | Remove a report                                               |

## Animals Table
| Action  | Description                                                   |
|---------|---------------------------------------------------------------|
| Create  | Add a new animal when a report is created                     |
| Read    | Retrieve animal details for display                           |
| Update  | Update animal status (from lost to found)                     |
| Delete  | Remove an animal record                                       |



## Achiteture diagram:

![image](https://github.com/user-attachments/assets/44213c96-ef72-4131-9567-6a1594afc31c)

## The Google Maps API will be used for:

1.	Geolocation:
o	Allow users to select or view the location of a report (abuse, lost/found animal) on the map.
o	Display markers on the map for registered reports.
2.	Addresses and Coordinates:
o	Convert addresses into coordinates (latitude and longitude) and vice versa.
o	Display the exact location on the map.

## Implementation

Frontend (React)

•	The Google Maps API is integrated into the frontend using the @react-google-maps/api library.
•	A Google Maps API key is required to load the map and enable its features. This key is securely stored in the frontend configuration file.

```javascript
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapComponent = ({ location }) => {
  return (
    <GoogleMap
      zoom={15}
      center={location}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

```

Backend

•	The backend does not directly interact with the Google Maps API. Instead, it receives the coordinates (latitude and longitude) from the frontend and stores them in the database.

```json
{
  "type": "abuse",
  "description": "Animal mistreated on X Street",
  "location": {
    "lat": -23.5505,
    "lng": -46.6333
  },
  "photos": ["url1", "url2"]
}
```
## Data Flow
1.	The user selects a location on the map or enters an address in the frontend.
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
![image](https://github.com/user-attachments/assets/a50d4dbc-4ce5-434f-b7b9-3aa09c3a9fe8)

## Report page
On this page, users can report cases of animal abuse or lost pets 
![image](https://github.com/user-attachments/assets/e7ce69d8-551f-4179-9b05-f0e7c675d4a6)


## Login page
Users can log into their account or create one. However, logging in is not required to submit reports, and they can choose to
remain anonymous. 


![image](https://github.com/user-attachments/assets/46c9ae22-de0c-4269-93ae-9677460ee681)




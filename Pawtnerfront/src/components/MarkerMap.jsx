import {useState} from "react";
import{
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef, 
} from "@vis.gl/react-google-maps";

export default function MarkerMap(props){
    const [infowindowOpen, setInfowindowOpen] = useState(false); //State to track InfoWindow visibility 
    const [expanded, setExpanded] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();//Reference to the marker 
    const {report} = props;
   
    return(
        <>
        <AdvancedMarker
            ref={markerRef} //Attach marker reference 
            onClick = {()=> setInfowindowOpen(true)} //Open InfoWindow on click 
            position={{lat: parseFloat(report.latitude), lng: parseFloat(report.longitude)}} //Marker coordinates 
            title="Click to see report details">
        </AdvancedMarker>


        {infowindowOpen && (
            <InfoWindow
            anchor={marker} //Atach InfoWindow to marker 
            maxWidth={250} //Set maximum width 
            onCloseClick={()=> {
                setInfowindowOpen(false);
                setExpanded(false);
            }} //Close when clicking outside 
            >


            <div className="info-window">
                <img src={report.imageUrl} alt="Animal" width="150" style={{borderRadius: "10px"}} />

                <p><strong>Type:</strong> {report.type}</p>
                <p><strong>Date:</strong> {report.date}</p>


                {expanded && (
                    <>
                    <p><strong>Animal:</strong> {report.animal}</p>
                    <p><strong>Breed:</strong> {report.breed}</p>
                    <p><strong>Email:</strong>  {report.email}</p>
                    <p><strong>Description:</strong>  {report.description}</p>
                    </>
                )}

                <button className="toggle-info" onClick={()=>setExpanded(!expanded)}>
                    {expanded ? "Show Less" : "More Info"}

                </button>

            </div>


        
            </InfoWindow>
            


        )}
        </>

    )
}
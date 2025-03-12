import {useState} from "react";
import{
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef, 
} from "@vis.gl/react-google-maps";

export default function MarkerMap(props){
    const [infowindowOpen, setInfowindowOpen] = useState(false); //State to track InfoWindow visibility 
    const [markerRef, marker] = useAdvancedMarkerRef();//Reference to the marker 
    const {report} = props;
    console.log("passei aqui");
    return(
        <>
        <AdvancedMarker
            ref={markerRef} //Attach marker reference 
            onClick = {()=> setInfowindowOpen(true)} //Open InfoWindow on click 
            position={{lat: parseFloat(report.latitude), lng: parseFloat(report.longitude)}} //Marker coordinates 
            title={"Advanced Marker that opens an Infowindow when clicked"}>
        </AdvancedMarker>


        {infowindowOpen && (
            <InfoWindow
            anchor={marker} //Atach InfoWindow to marker 
            maxWidth={200} //Set maximum width 
            onCloseClick={()=> setInfowindowOpen(false)} //Close when clicking outside 
            >

            <img src={report.imageUrl} alt="Animal" width={150} />
            {report.description}

            </InfoWindow>
            


        )}
        </>

    )
}
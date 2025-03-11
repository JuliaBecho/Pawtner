import {useState} from "react";
import{
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef, 
} from "@vis.gl/react-google-maps";

export default function MarkerMap(){
    const [infowindowOpen, setInfowindowOpen] = useState(false); //State to track InfoWindow visibility 
    const [markerRef, marker] = useAdvancedMarkerRef();//Reference to the marker 

    return(
        <>
        <AdvancedMarker
            ref={markerRef} //Attach marker reference 
            onClick = {()=> setInfowindowOpen(true)} //Open InfoWindow on click 
            position={{lat:28, lng:-82}} //Marker coordinates 
            title={"Advanced Marker that opens an Infowindow when clicked"}>
        </AdvancedMarker>


        {infowindowOpen && (
            <InfoWindow
            anchor={marker} //Atach InfoWindow to marker 
            maxWidth={200} //Set maximum width 
            onCloseClick={()=> setInfowindowOpen(false)} //Close when clicking outside 
            >

            <img src="https://th.bing.com/th/id/OIP.RdtIjkcPKeqjhZceaXB5lgHaE8?rs=1&pid=ImgDetMain" alt="cachorro" width={150} />
            Cao fofinho

            </InfoWindow>
            


        )}
        </>

    )
}
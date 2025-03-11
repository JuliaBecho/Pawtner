import {useState} from "react";
import{
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef, 
} from "@vis.gl/react-google-maps";

export default function MarkerMap(){
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return(
        <>
        <AdvancedMarker
            ref={markerRef}
            onClick = {()=> setInfowindowOpen(true)}
            position={{lat:28, lng:-82}}
            title={"Advanced Marker that opens an Infowindow when clicked"}>
        </AdvancedMarker>

        {infowindowOpen && (
            <InfoWindow
            anchor={marker}
            maxWidth={200}
            onCloseClick={()=> setInfowindowOpen(false)}
            >

            <img src="https://th.bing.com/th/id/OIP.RdtIjkcPKeqjhZceaXB5lgHaE8?rs=1&pid=ImgDetMain" alt="cachorro" width={150} />
            Cao fofinho

            </InfoWindow>
            


        )}
        </>

    )
}
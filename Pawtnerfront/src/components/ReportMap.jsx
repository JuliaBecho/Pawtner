import{APIProvider,Map, Marker} from "@vis.gl/react-google-maps"; //import Google maps Api components 
import { useState } from "react";

export default function ReportMap(props){
    const [marker, setMarker]= useState(null);

    const {updateLocationOnForm} = props;

    const handleMapClick = (event) => {
        if (event.detail) {
            const {lat, lng} = event.detail.latLng;
            updateLocationOnForm(lat, lng);
            setMarker({lat,lng});
        }
    };
       return(
    
           
    
                <div className="map-container">
                <APIProvider 
                    apiKey={import.meta.env.VITE_ANIMALMAP} //API key stored in enviroments variables
                    libraries={["marker"]} //Load required Google Maps libraries 
                    > 
    
    
                    <Map
                    mapId={'bfnlivhjj4vg85'} //Unique Google Maps ID for styling 
                    style={{width:"100%", height:"100%"}}//Full width and height inside container 
                    defaultZoom={12} //Initial zoom level 
                    onClick={handleMapClick}
                    defaultCenter={{lat: 53.55909057947169, lng: 10.005767668054645}}//Default map center
                    gestureHandling={'greedy'}//Enables smooth interaction on touch devices 
                    disableDefaultUI ={true}//Hides default Google Maps UI elements 
                    >
    
                        {marker && <Marker position={marker}/>}{""}
                        
                    </Map>
                </APIProvider>
    
                </div>
    
           
           
        );


}
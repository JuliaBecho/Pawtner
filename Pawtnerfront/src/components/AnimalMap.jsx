import{APIProvider,Map} from "@vis.gl/react-google-maps"; //import Google maps Api components 
import MarkerMap from "./MarkerMap";//Import custom makes component

export default function AnimalMap() {
    return(

       

            <div className="map-container">
            <APIProvider 
                apiKey={import.meta.env.VITE_ANIMALMAP} //API key stored in enviroments variables
                libraries={["marker"]} //Load required Google Maps libraries 
                > 


                <Map
                mapId={'bf51a910020fa25aalsfj'} //Unique Google Maps ID for styling 
                style={{width:"100%", height:"100%"}}//Full width and height inside container 
                defaultZoom={12} //Initial zoom level 
                defaultCenter={{lat: 53.55909057947169, lng: 10.005767668054645}}//Default map center
                gestureHandling={'greedy'}//Enables smooth interaction on touch devices 
                disableDefaultUI ={true}//Hides default Google Maps UI elements 
                >
                    <MarkerMap/>
                </Map>
            </APIProvider>

            </div>

       
       
    );
}
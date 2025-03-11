import{APIProvider,Map} from "@vis.gl/react-google-maps";
import MarkerMap from "./MarkerMap";

export default function AnimalMap() {
    return(

       

            <div className="map-container">
            <APIProvider 
                apiKey={import.meta.env.VITE_ANIMALMAP}
                libraries={["marker"]}>


                <Map
                mapId={'bf51a910020fa25aalsfj'}
                style={{width:"100%", height:"100%"}}
                defaultZoom={12}
                defaultCenter={{lat: 53.55909057947169, lng: 10.005767668054645}}
                gestureHandling={'greedy'}
                disableDefaultUI ={true}
                >
                    <MarkerMap/>
                </Map>
            </APIProvider>

            </div>

       
       
    );
}
import{APIProvider,Map} from "@vis.gl/react-google-maps";
import MarkerMap from "./MarkerMap";

export default function AnimalMap() {
    return(
        <APIProvider 
        apiKey={import.meta.env.VITE_ANIMALMAP}
        libraries={["marker"]}>
            <Map
             mapId={'bf51a910020fa25aalsfj'}
             style={{width:"100vw", height:"100vh"}}
             defaultZoom={10}
             defaultCenter={{lat: 53.55909057947169, lng: 10.005767668054645}}
             gestureHandling={'greedy'}
             disableDefaultUI ={true}
            >
                <MarkerMap/>
            </Map>
        </APIProvider>
    );
}
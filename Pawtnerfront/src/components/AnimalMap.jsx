import{APIProvider,Map} from "@vis.gl/react-google-maps"; //import Google maps Api components 
import MarkerMap from "./MarkerMap";//Import custom makes component

export default function AnimalMap(props) {
    const {reports} = props;
    console.log(reports);
    return(

       

            <div className="map-container2">
            <APIProvider 
                apiKey={import.meta.env.VITE_ANIMALMAP} //API key stored in enviroments variables
                libraries={["marker"]} //Load required Google Maps libraries 
                > 


                <Map
                mapId={'bf51a910020fa25aalsfj'} //Unique Google Maps ID for styling 
                style={{width:"100%", height:"100%"}}//Full width and height inside container 
                defaultZoom={12} //Initial zoom level 
                defaultCenter={{lat: 49.282729, lng:  -123.120738}}//Default map center
                gestureHandling={'greedy'}//Enables smooth interaction on touch devices 
                disableDefaultUI ={true}//Hides default Google Maps UI elements 
                >

                    {reports.map((report) => {
                    return(<MarkerMap key={report.id} report={report}/>)
                    })}
                    
                </Map>
            </APIProvider>

            </div>

       
       
    );
}
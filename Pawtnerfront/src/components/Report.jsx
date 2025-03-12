
import catphone from '../assets/catphone.png'
import { useState } from 'react'
import InputMask from "react-input-mask"
import axios from "axios"
import "../styles/report.css";
import { userFirebase } from '../context/FirebaseContext';
import ReportMap from './ReportMap';



export default function Report(){
    const{user,getToken} = userFirebase();

const[formData, setFormData] = useState({
    type:"lost",
    animal:"",
    breed:"",
    date:"",
    email:"",
    description:"",
    latitude:"",
    longitude:'',
    terms:false,

});

const[showMap, setShowMap] = useState(true);

    const handleChange = (e) => {
        const{name, value, type, checked}= e.target;
        setFormData({
            ...formData,
            [name]:type === "checkbox"?checked:
            value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({...formData, image: e.target.files[0]

        });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:",formData);

    const token = await getToken();
    console.log("Token", token);

    axios
    .post("http://localhost:3000/reports", formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            "Authorization" : `Bearer ${token}`,
        },
    })
    
    .then((response)=>{
        alert("Your report has been sent");
        setFormData({
            type:"lost",
            animal:"",
            breed:"",
            date:"",
            email:"",
            description:"",
            latitude:"",
            longitude:'',
            image:null,
            terms:false,
           
        });
        console.log(response.data);
    })
    .catch((error)=>{
        alert("Something went wrong");
        console.log(error);
    });


};

function handleShowMapOrForm(){
    if (!user) return  <p>Please log in to submit a report</p>;
    if (showMap) {
        return (
        <ReportMap
        updateLocationOnForm={(lat,lng) => {
            setFormData({...formData, latitude:lat, longitude:lng});
        }}
        />) 
    
    }else {

        return(
            <form onSubmit={handleSubmit} className='report-form'>

                <div className='form-colums'>

                <div className='form-left'>

                    <label htmlFor="type">Type of report:</label>
                 <select value={formData.type} name="type" id="type" onChange={handleChange}  required>
                    <option value="lost">Lost animal</option>
                    <option value="mistreatment">Animal abuse</option>
                    <option value="found">Rescued animal</option>
                </select>
                <br/><br />

                {/*Text input field for specifying the animal*/}
                <label htmlFor="animal">Animal:</label>
                <input value={formData.animal} type="text" id='text' name='animal' onChange={handleChange} required />
                <br/><br />

                {/*Text input field for specifying the breed*/}
                <label htmlFor="breed">Breed:</label>
                <input value={formData.breed} type="breed" id='breed' name='breed' onChange={handleChange} required />
                <br/><br />

                {/*Text input field for specifying when the event occurred*/}
                <label htmlFor="date">Date:</label>
                <input value={formData.date} type="date" id='date' name='date' onChange={handleChange}  required />
                <br/><br />
            
                {/*Phone number input field for user contact*/}
                <label htmlFor="email">Email:</label>
                <input value={formData.email} type="email" id='email' name='email' onChange={handleChange}  required />
                <br /><br />
                <label htmlFor="latitude">Latitude:</label>
                <input value={formData.latitude} type="text" id='latitude' name='latitude' onChange={handleChange}  required />
                <br /><br />
                <label htmlFor="longitude">Longitude:</label>
                <input value={formData.longitude} type="text" id='longitude' name='longitude' onChange={handleChange}  required />
                <br /><br />
                </div>
                    
                <br /><br />

            <div className='form-right'>

                 {/*Description input field */}
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} required></textarea>
                {/* <input value={formData.description} type="description" id='description' name='description' onChange={handleChange}  required />
                <br/><br /> */}

                <label htmlFor="image">Picture:</label>
                <input type="file" id="image" name='image' accept='image/*' onChange={handleFileChange} required />
                <br /><br />
                {/*Checkbox for agreeing to include phone number*/}
                <div className='checkbox-group'>
                    <input checked={formData.terms} type="checkbox" id='terms' name='terms' onChange={handleChange}  required />
                <label htmlFor="terms">I agree to include my email for contact</label>
                <br /><br />
                </div>
                
              
               
                </div>

            </div>

                <button className='submitbutton' type='button' onClick={()=> setShowMap(true)}>Return to map</button>
                <button className='submitbutton' type='submit'>Report</button>
                

                </form>
        );
    }
}

    function handleReportClick(){
        if(formData.latitude === "" || formData.longitude === ""){
            alert("Please select a location on the map");
        }else {
            setShowMap(false);
        }
    }

    return(
        <div className="page-container"> {/*Main container wrapping the entire page*/}

            {/*Sidebar section with instructions and a report button */}
            <div className="sidebar">
                <p>Please select the place you want to report and click on "Report Now!"</p>
                <button className="report-button" onClick={handleReportClick}>REPORT NOW!</button>
                {/* <img src= {catphone} alt="" className="location-icon"/> */}
            </div>


            {/*Report submission form container*/}
            <div className='report-container'>
                <h2 className='titles'>Submit a report</h2>

            {handleShowMapOrForm()}

              
            </div>
        </div>
        
    );
}

import catphone from '../assets/catphone.png'
import { useState } from 'react'
import InputMask from "react-input-mask"
import axios from "axios"
import "../styles/report.css";
import { userFirebase } from '../context/FirebaseContext';



export default function Report(){
    const{user,getToken} = userFirebase();

const[formData, setFormData] = useState({
    type:"lost",
    animal:"",
    breed:"",
    date:"",
    email:"",
    description:"",
    terms:false,
    terms2:false,
});

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
            image:null,
            terms:false,
            terms2:false,
        });
        console.log(response.data);
    })
    .catch((error)=>{
        alert("Something went wrong");
        console.log(error);
    });


};

    return(
        <div className="page-container"> {/*Main container wrapping the entire page*/}

            {/*Sidebar section with instructions and a report button */}
            <div className="sidebar">
                <p>Please select the place you want to report and click on "Report Now!"</p>
                <button className="report-button">REPORT NOW!</button>
                {/* <img src= {catphone} alt="" className="location-icon"/> */}
            </div>


            {/*Report submission form container*/}
            <div className='report-container'>
                <h2 className='titles'>Submit a report</h2>

                {/*Form for submitting a report*/}
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
                
                {/*Checkbox for agreeing to be contacted*/}
               
                </div>

                

            </div>
               
               

                <button className='submitbutton' type='submit'>Report</button>

                </form>
                
            </div>
        </div>
        
    )
}
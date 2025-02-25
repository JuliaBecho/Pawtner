
import Doggif from '../assets/dog.gif'
import { useState } from 'react'
import InputMask from "react-input-mask"
import axios from "axios"
import "../styles/report.css";



export default function Report(){
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

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:",formData);
    axios
    .post("http://localhost:3000/reports", formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        },
    })
    
    .then((response)=>{
        alert("seus dados foram salvos");
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
        alert("algo deu errado");
        console.log(error);
    });


};

    return(
        <div className="page-container"> {/*Main container wrapping the entire page*/}

            {/*Sidebar section with instructions and a report button */}
            <div className="sidebar">
                <p>Please select the place you want to report and click on "Report Now!"</p>
                <button className="report-button">REPORT NOW!</button>
                <img src= {Doggif} alt="" className="location-icon"/>
            </div>


            {/*Report submission form container*/}
            <div className='report-container'>
                <h2 className='titles'>Submit a report</h2>

                {/*Form for submitting a report*/}
                <form onSubmit={handleSubmit}>
                    
                    {/*Dropdown menu for selecting the type of report*/}
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

                {/*Description input field */}
                <label htmlFor="description">Description:</label>
                <input value={formData.description} type="description" id='description' name='description' onChange={handleChange}  required />
                <br/><br />

                <label htmlFor="image">Picture:</label>
                <input type="file" id="image" name='image' accept='image/*' onChange={handleFileChange} required />

                {/*Checkbox for agreeing to include phone number*/}
                <div className='checkbox-group'>
                    <input checked={formData.terms} type="checkbox" id='terms' name='terms' onChange={handleChange}  required />
                <label htmlFor="terms">I agree to include my email for contact</label>
                <br /><br />
                </div>
                
                {/*Checkbox for agreeing to be contacted*/}
                <div className='checkbox-group'> 
                    <input checked={formData.terms2} type="checkbox" id='terms2' name='terms2' onChange={handleChange}  required />
                <label htmlFor="terms2">I agree to be contacted for more information or updates</label>
                <br /><br />
                </div>
               

                <button className='submitbutton' type='submit'>Report</button>

                </form>
                
            </div>
        </div>
        
    )
}
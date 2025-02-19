
import Doggif from './assets/dog.gif'
export default function Report(){
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
                <h2 className='title'>Submit a report</h2>

                {/*Form for submitting a report*/}
                <form>
                    
                    {/*Dropdown menu for selecting the type of report*/}
                    <label htmlFor="type">Type of report:</label>
                 <select name="type" id="type" required>
                    <option value="lost">Lost animal</option>
                    <option value="mistreatment">Animal abuse</option>
                    <option value="found">Rescued animal</option>
                </select>
                <br/><br />

                {/*Text input field for specifying the animal*/}
                <label htmlFor="animal">Animal:</label>
                <input type="text" id='text' name='text' required />
                <br/><br />

                {/*Text input field for specifying the breed*/}
                <label htmlFor="breed">Breed:</label>
                <input type="breed" id='breed' name='breed' required />
                <br/><br />

                {/*Text input field for specifying when the event occurred*/}
                <label htmlFor="date">Date:</label>
                <input type="date" id='date' name='date' required />
                <br/><br />
                
                {/*Phone number input field for user contact*/}
                <label htmlFor="phone">Phone Number</label>
                <input type="phone" id='phone' name='phone' required />
                <br /><br />

                {/*Description input field */}
                <label htmlFor="description">Description:</label>
                <input type="description" id='description' name='description' required />
                <br/><br />

                {/*Checkbox for agreeing to include phone number*/}
                <div className='checkbox-group'>
                    <input type="checkbox" id='terms' name='terms' required />
                <label htmlFor="terms">I agree to include my cell phone number for contact</label>
                <br /><br />
                </div>
                
                {/*Checkbox for agreeing to be contacted*/}
                <div className='checkbox-group'> 
                    <input type="checkbox" id='terms2' name='terms2' required />
                <label htmlFor="terms2">I agree to be contacted for more information or updates</label>
                <br /><br />
                </div>
               

                <button className='submitbutton' type='submit'>Report</button>

                </form>
                
            </div>
        </div>
        
    )
}
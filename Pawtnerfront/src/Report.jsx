import PawtnerLogo from './assets/logopawtner.jpg'
export default function Text(){
    return(
        <div className="page-container">
            <div className="sidebar">
                <p>Please select the place you want to report and click on "Report Now!"</p>
                <button className="report-button">REPORT NOW!</button>
                <img src= {PawtnerLogo} alt="" className="location-icon"/>
            </div>
            <div>
                <h1>Submit a report</h1>
                <label htmlFor="type">Type of report:</label>
                 <select name="type" id="type" required>
                    <option value="lost">Lost animal</option>
                    <option value="mistreatment">Animal abuse</option>
                    <option value="found">Rescued animal</option>
                </select>
                <br/><br />
                <label htmlFor="animal">Animal:</label>
                <input type="text" id='text' name='text' required />
                <br/><br />
                <label htmlFor="breed">Breed:</label>
                <input type="breed" id='breed' name='breed' required />
                <br/><br />
                <label htmlFor="date">Date:</label>
                <input type="date" id='date' name='date' required />
                <br/><br />
                <label htmlFor="phone">Phone Number</label>
                <input type="phone" id='phone' name='phone' required />
                <br /><br />
                <label htmlFor="description">Description:</label>
                <input type="description" id='description' name='description' required />
                <br/><br />
                <input type="checkbox" id='terms' name='terms' required />
                <label htmlFor="terms">I agree to include my cell phone number for contact</label>
                <br /><br />
                <input type="checkbox" id='terms2' name='terms2' required />
                <label htmlFor="terms2">I agree to be contacted for more information or updates</label>
                <br /><br />
                <button type='submit'>Report</button>
            </div>
        </div>
        
    )
}
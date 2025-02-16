import PawtnerLogo from './assets/logopawtner.jpg'
export default function Text(){
    return(
        <div className="page-container">
            <div className="sidebar">
                <p>Please select the place you want to report and click on "Report Now!"</p>
                <button className="report-button">REPORT NOW!</button>
                <img src= {PawtnerLogo} alt="" className="location-icon"/>
            </div>

        </div>
    )
}
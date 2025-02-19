import { useState } from 'react'
import Header from './Header'
import Title from './Title'
import Container from './Container'
import Content from './Content'
import Buttons from './Buttons'
import Text from './Text'
import Report from './Report'

function App() {
  const [animal, setAnimal] = useState("home"); //Tracks which section is being displayed
  //animal = state variable that stores the current section
  //setAnimal = state setter function that updates the value of animal 
  return (
    <div>
      <Header></Header>
      <Title></Title> 

      {/*Button group for navigation*/}
      <div className="button-group">
        <button onClick={() => setAnimal("home")} className="button">Home</button>
        <button  onClick={() => setAnimal("report")} className="button">Report</button>
        <button  onClick={() => setAnimal("view")} className="button">View</button>
       
    </div>
     <div>
          {/* If 'home' is selected, display the home components*/}
          {animal === "home" && (<div><Container></Container><Content></Content><Text></Text></div>)}
          
          {/* If 'report' is selected, display the Report component*/}
          {animal === "report" && <Report/>}
        </div>
    </div>
  );
}

export default App

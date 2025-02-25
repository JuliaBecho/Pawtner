import { useState } from 'react'
import Header from './components/Header'
import Title from './components/Title'
import Container from './components/Container'
import Content from './components/Content'
import Buttons from './components/Buttons'
import Text from './components/Text'
import Report from './components/Report'
import View from './components/View'
import Login from './components/Login'
import Create from './components/Create'


function App() {
  const [animal, setAnimal] = useState("home"); //Tracks which section is being displayed
  //animal = state variable that stores the current section
  //setAnimal = state setter function that updates the value of animal 
  return (
    <div>
      <Header setAnimal={setAnimal}></Header>
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

          {animal === "view" && <View/>}

          {animal === "login" && <Login setAnimal={setAnimal}/>}

          {animal === "create" && <Create/>}
        </div>
    </div>
  );
}

export default App

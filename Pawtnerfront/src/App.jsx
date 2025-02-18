import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Header'
import Title from './Title'
import Container from './Container'
import Content from './Content'
import Buttons from './Buttons'
import Text from './Text'
import Report from './Report'
function App() {
  const [count, setCount] = useState(0)
  const [animal, setAnimal] = useState("home");
  return (
    <div>
      <Header></Header>
      <Title></Title> 
      <div className="button-group">
        <button onClick={() => setAnimal("home")} className="button">Home</button>
        <button  onClick={() => setAnimal("report")} className="button">Report</button>
        <button  onClick={() => setAnimal("view")} className="button">View</button>
       
    </div>
     <div>
          {animal === "home" && (<div><Container></Container><Content></Content><Text></Text></div>)}
          {animal === "report" && <Report/>}
        </div>
    </div>
  );
}

export default App

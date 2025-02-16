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

  return (
    <>
      <Header></Header>
      <Title></Title> 
      <Buttons></Buttons>
      <Container></Container>
      <Content></Content>
      <Text></Text>
      <Report></Report>
     
    </>
  )
}

export default App

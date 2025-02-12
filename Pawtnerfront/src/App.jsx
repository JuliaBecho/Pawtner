import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Headers from './Headers'
import Title from './Title'
import Container from './Container'
import Content from './Content'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Headers></Headers>
      <Title></Title>
      <Container></Container>
      <Content></Content>
    </>
  )
}

export default App

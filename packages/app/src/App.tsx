import React from "react";
import styled from "styled-components";
import './App.css'

const A = styled.div`
  color: red;
  height: ${props => props.height}px;
  font-size: 20px;
  width: ${props => props.width}px;
  background-color: pink;
`

const B = styled.div`
  color: blue;
  ${A}:hover & {
    color: green;
  }
`

function App() {
  return (
    <>
      <A height={100} width={500}>
        <p>123</p>
        <B className='b'>456</B>
      </A>
    </>
  )
}

export default App

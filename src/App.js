import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import {
  Flex,
  Box,
  Provider } from 'rebass'

import Header from './components/Header'
import Footer from './components/Footer'

import Calculator from './containers/Calculator'

injectGlobal`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled(Flex)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const StyledMain = styled(Box)`
  flex: 1;
`

class App extends Component {
  render () {
    return (
      <Provider>
        <Wrapper>
          <Header />
          <StyledMain>
            <Calculator />
          </StyledMain>
          <Footer />
        </Wrapper>
      </Provider>
    )
  }
}

export default App

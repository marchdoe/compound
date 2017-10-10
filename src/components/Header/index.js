import React, { Component } from 'react'
import styled from 'styled-components'

import { Box, Heading } from 'rebass'

const StyledHeader = styled(Box)`
  background-color: #f1f1f1;
  color: #888;
  text-align: center;
  min-height: 100px;
  padding-top: 25px;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-weight: 700;
`

class Header extends Component {
  render () {
    return (
      <StyledHeader is='header'>
        <Heading p={2} f={3} is='h1'>Compound Interest Calculator</Heading>
      </StyledHeader>
    )
  }
}

export default Header

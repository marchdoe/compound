import React, { Component } from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  font-size: 11px;
  text-align: center;
  background-color: #f1f1f1;
  color: #999;
  text-transform: uppercase;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

class Footer extends Component {
  render () {
    return (
      <StyledFooter>
        Footer
      </StyledFooter>
    )
  }
}

export default Footer

import React, { Component } from 'react'
import getCompoundInterest from './utils/compoundInterest'
import getIncomeTax from './utils/incomeTax'
// import BarChart from './components/BarChart'
import MoneyInput from './components/MoneyInput'
import PercentInput from './components/PercentInput'
import YearInput from './components/YearInput'

import { Box, Heading, Label, Provider } from 'rebass'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      initialDeposit: 100,
      regularDeposit: 0,
      numberOfYears: 5,
      interestRate: 0.03,
      applyTax: true,
      annualIncome: 75000
    }
  }

  handleFormChange = event => {
    let newValue = event.target.value
    switch (event.target.name) {
      case 'numberOfYears':
        if (newValue < 0) {
          newValue = 0
        } else if (newValue > 60) {
          newValue = 60
        }
        break
      default:
        newValue = event.target.value
    }

    this.setState({
      [event.target.name]: newValue
    })
  }

  updateInitialDeposit = initialDeposit => {
    this.setState({
      initialDeposit: initialDeposit
    })
  }

  updateRegularDeposit = regularDeposit => {
    this.setState({
      regularDeposit: regularDeposit
    })
  }

  updateAnnualIncome = annualIncome => {
    this.setState({
      annualIncome: annualIncome
    })
  }

  updateInterestRate = interestRate => {
    this.setState({
      interestRate: interestRate
    })
  }

  updateNumberOfYears = numberOfYears => {
    this.setState({
      numberOfYears: numberOfYears
    })
  }

  handleToggle = event => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  getYearlyInterest () {
    let yearlyInterest = []

    let currentPrincipal = this.state.initialDeposit
    let totalInterest = 0
    let regularDeposits = 0
    for (let i = 1; i <= this.state.numberOfYears; i++) {
      regularDeposits += this.state.regularDeposit * 12

      let grossPrincipal = getCompoundInterest(currentPrincipal, this.state.regularDeposit, this.state.interestRate, 12)

      // Money made this year in interest
      let capitalGains = grossPrincipal - currentPrincipal - (this.state.regularDeposit * 12)
      totalInterest += capitalGains

      // Money after you've accrued your interest for the year
      currentPrincipal = grossPrincipal

      // Amount owed in taxes
      let capitalGainsTax = 0
      if (this.state.applyTax) {
        capitalGainsTax = this.calculateCapitalGainsTax(capitalGains, +this.state.annualIncome)
      }

      // Money after taxes
      currentPrincipal -= capitalGainsTax

      totalInterest -= capitalGainsTax

      yearlyInterest = yearlyInterest.concat({
        name: `Year ${i}`,
        principal: Math.round(currentPrincipal),
        regularDeposits: regularDeposits,
        capitalGainsTax: Math.round(capitalGainsTax),
        totalInterest: Math.round(totalInterest)
      })
    }

    return yearlyInterest
  }

  calculateCapitalGainsTax = (capitalGains, annualIncome) => {
    let grossIncomeTax = getIncomeTax(annualIncome + capitalGains)
    let incomeTax = getIncomeTax(annualIncome)

    return grossIncomeTax - incomeTax
  }

  render () {
    // let data = {
    //   initialDeposit: this.getYearlyInterest().map(yearlyInterest => this.state.initialDeposit),
    //   regularDeposits: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.regularDeposits),
    //   totalInterest: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.totalInterest),
    //   capitalGainsTax: this.getYearlyInterest().map(yearlyInterest => yearlyInterest.capitalGainsTax)
    // }

    return (
      <Provider>

        <Heading is='h1'>Strategy</Heading>

        <Box>
          <Label>Initial Deposit</Label>
          <MoneyInput
            name="initialDeposit"
            inputValue={this.state.initialDeposit}
            onUpdate={this.updateInitialDeposit}
          />
        </Box>

        <Box>
          <Label>Regular Deposit</Label>
          <MoneyInput
            name="regularDeposit"
            inputValue={this.state.regularDeposit}
            onUpdate={this.updateRegularDeposit}
          />
        </Box>

        <Box>
          <Label>Number of Years (Max. 60)</Label>
          <YearInput
            name="numberOfYears"
            inputValue={this.state.numberOfYears}
            onUpdate={this.updateNumberOfYears}
          />
        </Box>


        <Label>Interest Rate</Label>
        <PercentInput
          name="interestRate"
          inputValue={this.state.interestRate}
          onUpdate={this.updateInterestRate}
        />

        <Heading is='h2'>Taxes</Heading>
        <Box>
          <Label>Apply Tax</Label>
          <input type="checkbox" name="applyTax" checked={this.state.applyTax}
                 onChange={this.handleToggle}/>
        </Box>

        <Box>
          <Label>Annual Income</Label>
          <MoneyInput
            name="annualIncome"
            inputValue={this.state.annualIncome}
            onUpdate={this.updateAnnualIncome}
          />
        </Box>

        <Heading is='h2'>Results</Heading>
        {/* <BarChart
          labels={this.getYearlyInterest().map(yearlyInterest => yearlyInterest.name)}
          data={data}
        /> */}
      </Provider>
    )
  }
}

export default App

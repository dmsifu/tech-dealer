import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App'


test('show all tv deals navigates to tv deal page', async ()=>{

    const history = createMemoryHistory()
    const user = userEvent.setup()

    render(
        <Router location={history.location} navigator={history} >
            <App /> 
        </Router>
    )

    expect(screen.getByText(/show all tv deals/i)).toBeInTheDocument()

    await user.click(screen.getByText(/show all tv deals/i))

    expect(screen.getByText(/search deals/i)).toBeInTheDocument()
    // expect(history.location.pathname).toBe('/tvs?page=1')
})
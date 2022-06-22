import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

test('renders the app without crashing', ()=>{
    render(<App />, {wrapper: MemoryRouter})
    const siteName = screen.getByText("TechDealer")
    expect(siteName).toBeInTheDocument()
})
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DealCard from '../components/DealCard'
import Hero from '../components/Hero'
import TopContainer from '../components/TopContainer'
import Home from '../pages/Home'

describe('components on homepage render on screen', ()=> {
    test('Top container renders', () =>{
        render(<TopContainer/>)
        const siteName = screen.getByText('TechDealer')
        expect(siteName).toBeInTheDocument()
    })
    
    test('Home page renders', () => {
        render(<Home />)
        const homeText = screen.getByText(/todays best tv deals/i)
        expect(homeText).toBeInTheDocument()
    })

    test('Hero section renders', () => {
        render(<Hero />)
        const heroText = screen.getByText(/All in one place/i)
        expect(heroText).toBeInTheDocument()
    })

    test('DealCard renders', () => {
        render(<DealCard  
            title={'title'} 
            offerPrice={'offerPrice'} 
            originalPrice={'originalPrice'} 
            percentOff={'percentOff'}
            productLink={'productLink'} 
            productImageLink={'productImageLink'}
            soldOn={'soldOn'}
         />)
        
        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('offerPrice')).toBeInTheDocument()
        expect(screen.getByText('originalPrice')).toBeInTheDocument()
        expect(screen.getByText('percentOff Off')).toBeInTheDocument()
        expect(screen.getByText('Sold on soldOn')).toBeInTheDocument()
    })
})

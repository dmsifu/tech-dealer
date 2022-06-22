import { motion } from 'framer-motion'
import '../sass/Hero.scss'

function Hero() {
    const heroVariants = {
        scroll: {
            y: [-240,192],
            transition: {
                duration: 7,
                 repeat: Infinity,
                 ease: "linear"
            }
        }
    }

  return (
    <div className="hero-container">
        <div className='hero-text'>
            <h1>Find Tech Deals from across the web</h1>
            <h2>All in one place</h2>
        </div>
        <ul className='hero-animated-container'>
            <motion.li variants={heroVariants} animate="scroll">Walmart</motion.li>
            <motion.li variants={heroVariants} animate="scroll">BestBuy</motion.li>
            <motion.li variants={heroVariants} animate="scroll">Amazon</motion.li>
            <motion.li variants={heroVariants} animate="scroll">Newegg</motion.li>
            <motion.li variants={heroVariants} animate="scroll">Walmart</motion.li>
            <motion.li variants={heroVariants} animate="scroll">BestBuy</motion.li>
            <motion.li variants={heroVariants} animate="scroll">Amazon</motion.li>
            <motion.li variants={heroVariants} animate="scroll">Newegg</motion.li>
        </ul>
    </div>
  )
}

export default Hero
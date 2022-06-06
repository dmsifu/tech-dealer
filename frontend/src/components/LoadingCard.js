import { motion } from 'framer-motion'
import '../sass/LoadingCard.scss'

function LoadingCard() {

    const DealCardVariants = {
        visible: {opacity: 1},
        hidden : {opacity: 0}
      }

  return (
    <motion.div className="loading-card" 
        animate={{ backgroundSize: ['300% 100%','100% 100%', '300% 100%']}}
        transition={{ duration: 1, repeat: Infinity}}
        >
    </motion.div>
  )
}

export default LoadingCard
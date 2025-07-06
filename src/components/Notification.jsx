import { useState, useEffect } from 'react'
import './Animations/Notification.css'

function Notification({ notification }) {
const [isVisible, setIsVisible] = useState(false)
const [isHiding, setIsHiding] = useState(false)

useEffect(() => {
    if (notification) {
    setIsVisible(true)
    setIsHiding(false)
    
      // Auto-hide después de 3 segundos
    const timer = setTimeout(() => {
        handleHide()
    }, 3000)
    
    return () => clearTimeout(timer)
    } else {
    setIsVisible(false)
    setIsHiding(false)
    }
}, [notification])

const handleHide = () => {
    setIsHiding(true)
    setTimeout(() => {
    setIsVisible(false)
    }, 300)
}

const getNotificationIcon = (type) => {
    switch (type) {
    case 'success': return '✅'
    case 'error': return '❌'
    case 'warning': return '⚠️'
    case 'info': return 'ℹ️'
    default: return '📢'
    }
}

if (!notification || !isVisible) return null

return (
    <div 
    className={`notification ${notification.type} ${isHiding ? 'hiding' : ''}`}
    onClick={handleHide}
    >
    <div className="notification-content">
        <div className="notification-icon">
        {getNotificationIcon(notification.type)}
        </div>
        <div className="notification-message">
        {notification.message}
        </div>
        <button 
        className="notification-close"
        onClick={handleHide}
        aria-label="Cerrar notificación"
        >
        ×
        </button>
    </div>
    </div>
)
}

export default Notification
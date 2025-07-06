import React, { useState, useEffect } from 'react'

const Notification = ({ notification }) => {
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
    if (notification) {
    setIsVisible(true)
    const timer = setTimeout(() => setIsVisible(false), 3000)
    return () => clearTimeout(timer)
    }
}, [notification])

if (!notification || !isVisible) return null

const getNotificationStyles = (type) => {
    switch (type) {
    case 'success':
        return 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
    case 'error':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
    case 'warning':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
    default:
        return 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
    }
}

return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${getNotificationStyles(notification.type)} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
    <div className="flex items-center gap-2">
        <span className="text-lg">
        {notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : '📢'}
        </span>
        <span className="font-semibold">{notification.message}</span>
    </div>
    </div>
)
}

export default Notification
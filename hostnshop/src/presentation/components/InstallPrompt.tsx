// 'use client'
// import { useState, useEffect } from 'react'

// export default function InstallPrompt() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
//   const [isIOS, setIsIOS] = useState(false)
//   const [isStandalone, setIsStandalone] = useState(false)

//   useEffect(() => {
//     // Check if on iOS
//     setIsIOS(
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
//     )
    
//     // Check if already installed
//     setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    
//     // For Chrome, Edge, etc.
//     const handleBeforeInstallPrompt = (e: Event) => {
//       e.preventDefault()
//       setDeferredPrompt(e)
//     }
    
//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
//     }
//   }, [])
  
//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return
    
//     deferredPrompt.prompt()
//     const { outcome } = await deferredPrompt.userChoice
    
//     if (outcome === 'accepted') {
//       console.log('User accepted the install prompt')
//     } else {
//       console.log('User dismissed the install prompt')
//     }
    
//     setDeferredPrompt(null)
//   }
  
//   if (isStandalone) {
//     return null // Already installed
//   }
  
//   return (
//     <div></div>
    
//   )
// }
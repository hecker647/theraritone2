import React, { useEffect, useRef } from 'react';

const LiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create more realistic floating particles
    const createRealisticParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'realistic-particle';
      
      // Varied particle sizes for depth
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Enhanced golden/amber color palette
      const colors = [
        'rgba(255, 215, 0, 0.9)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(255, 235, 59, 0.7)',
        'rgba(255, 248, 225, 0.95)',
        'rgba(255, 223, 186, 0.6)',
        'rgba(255, 165, 0, 0.85)',
        'rgba(255, 140, 0, 0.75)',
        'rgba(255, 69, 0, 0.65)'
      ];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      particle.style.boxShadow = `0 0 ${size * 4}px ${colors[Math.floor(Math.random() * colors.length)]}, 0 0 ${size * 8}px ${colors[Math.floor(Math.random() * colors.length)]}`;
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-10px';
      
      // More realistic animation duration
      const duration = Math.random() * 30 + 25;
      particle.style.animation = `realistic-float ${duration}s linear infinite`;
      
      // Enhanced horizontal drift with wind effect
      const drift = (Math.random() - 0.5) * 400;
      particle.style.setProperty('--drift', `${drift}px`);
      
      // Random rotation for more realism
      const rotation = Math.random() * 360;
      particle.style.setProperty('--rotation', `${rotation}deg`);
      
      // Random pulsing effect
      const pulseScale = 0.8 + Math.random() * 0.4;
      particle.style.setProperty('--pulse-scale', `${pulseScale}`);
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create initial particles with staggered timing
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createRealisticParticle(), i * 300);
    }

    // Continue creating particles more frequently
    const interval = setInterval(createRealisticParticle, 800);

    // Add enhanced CSS for realistic particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes realistic-float {
        0% {
          transform: translateY(0px) translateX(0px) rotate(0deg) scale(0);
          opacity: 0;
        }
        3% {
          opacity: 1;
          transform: scale(var(--pulse-scale, 1)) rotate(var(--rotation, 0deg));
        }
        15% {
          transform: translateY(-15vh) translateX(calc(var(--drift, 0px) * 0.15)) rotate(calc(var(--rotation, 0deg) + 54deg)) scale(calc(var(--pulse-scale, 1) * 1.3));
        }
        30% {
          transform: translateY(-30vh) translateX(calc(var(--drift, 0px) * 0.3)) rotate(calc(var(--rotation, 0deg) + 108deg)) scale(calc(var(--pulse-scale, 1) * 1.1));
        }
        45% {
          transform: translateY(-45vh) translateX(calc(var(--drift, 0px) * 0.45)) rotate(calc(var(--rotation, 0deg) + 162deg)) scale(var(--pulse-scale, 1));
        }
        60% {
          transform: translateY(-60vh) translateX(calc(var(--drift, 0px) * 0.6)) rotate(calc(var(--rotation, 0deg) + 216deg)) scale(calc(var(--pulse-scale, 1) * 0.9));
        }
        75% {
          transform: translateY(-75vh) translateX(calc(var(--drift, 0px) * 0.75)) rotate(calc(var(--rotation, 0deg) + 270deg)) scale(calc(var(--pulse-scale, 1) * 0.8));
        }
        90% {
          transform: translateY(-90vh) translateX(calc(var(--drift, 0px) * 0.9)) rotate(calc(var(--rotation, 0deg) + 324deg)) scale(calc(var(--pulse-scale, 1) * 0.6));
          opacity: 0.8;
        }
        100% {
          transform: translateY(-100vh) translateX(var(--drift, 0px)) rotate(calc(var(--rotation, 0deg) + 360deg)) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes aurora-dance {
        0%, 100% { 
          opacity: 0.3;
          transform: scale(1) rotate(0deg);
        }
        25% { 
          opacity: 0.7;
          transform: scale(1.1) rotate(90deg);
        }
        50% { 
          opacity: 0.5;
          transform: scale(0.9) rotate(180deg);
        }
        75% { 
          opacity: 0.8;
          transform: scale(1.05) rotate(270deg);
        }
      }
      
      @keyframes cosmic-pulse {
        0%, 100% {
          opacity: 0.2;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.2);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearInterval(interval);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="live-enhanced-background">
      {/* Enhanced cosmic aurora gradient overlay with more vibrant colors */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-800/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animation: 'aurora-dance 20s ease-in-out infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-yellow-700/35 to-transparent rounded-full blur-3xl" style={{ animation: 'aurora-dance 25s ease-in-out infinite 5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-orange-800/30 to-transparent rounded-full blur-2xl" style={{ animation: 'aurora-dance 30s ease-in-out infinite 10s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-radial from-amber-700/25 to-transparent rounded-full blur-3xl" style={{ animation: 'aurora-dance 35s ease-in-out infinite 15s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-64 h-64 bg-gradient-radial from-yellow-600/20 to-transparent rounded-full blur-2xl" style={{ animation: 'aurora-dance 28s ease-in-out infinite 8s' }}></div>
      </div>
      
      {/* Enhanced cosmic grid overlay with golden tones */}
      <div className="absolute inset-0 opacity-12" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 215, 0, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 215, 0, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        animation: 'realistic-drift 200s linear infinite'
      }}></div>

      {/* Additional realistic atmospheric effects */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-amber-800/8 to-transparent" style={{ animation: 'cosmic-pulse 18s ease-in-out infinite' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-yellow-800/6 to-transparent" style={{ animation: 'cosmic-pulse 22s ease-in-out infinite 6s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-orange-800/4 to-transparent" style={{ animation: 'cosmic-pulse 26s ease-in-out infinite 12s' }}></div>
      </div>

      {/* Floating cosmic dust effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-300 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '3s' }}></div>
        <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-yellow-500 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '4s' }}></div>
      </div>

      <style jsx>{`
        @keyframes realistic-drift {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          100% {
            transform: translateX(-100px) translateY(-100px);
          }
        }
        
        .live-enhanced-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0f0a 12%, #2c1810 28%, #1a1a1a 45%, #2c1810 62%, #1a0f0a 78%, #0f0f0f 88%, #0a0a0a 100%);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LiveBackground;
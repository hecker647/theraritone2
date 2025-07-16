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
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // More realistic colors - golden/amber tones
      const colors = [
        'rgba(255, 215, 0, 0.8)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(255, 235, 59, 0.6)',
        'rgba(255, 248, 225, 0.9)',
        'rgba(255, 223, 186, 0.5)'
      ];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      particle.style.boxShadow = `0 0 ${size * 3}px ${colors[Math.floor(Math.random() * colors.length)]}`;
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-10px';
      
      // More realistic animation duration
      const duration = Math.random() * 25 + 20;
      particle.style.animation = `realistic-float ${duration}s linear infinite`;
      
      // Random horizontal drift with wind effect
      const drift = (Math.random() - 0.5) * 300;
      particle.style.setProperty('--drift', `${drift}px`);
      
      // Random rotation for more realism
      const rotation = Math.random() * 360;
      particle.style.setProperty('--rotation', `${rotation}deg`);
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, duration * 1000);
    };

    // Create initial particles with staggered timing
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createRealisticParticle(), i * 500);
    }

    // Continue creating particles
    const interval = setInterval(createRealisticParticle, 1500);

    // Add enhanced CSS for realistic particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes realistic-float {
        0% {
          transform: translateY(0px) translateX(0px) rotate(0deg) scale(0);
          opacity: 0;
        }
        5% {
          opacity: 1;
          transform: scale(1) rotate(var(--rotation, 0deg));
        }
        25% {
          transform: translateY(-25vh) translateX(calc(var(--drift, 0px) * 0.25)) rotate(calc(var(--rotation, 0deg) + 90deg)) scale(1.2);
        }
        50% {
          transform: translateY(-50vh) translateX(calc(var(--drift, 0px) * 0.5)) rotate(calc(var(--rotation, 0deg) + 180deg)) scale(1);
        }
        75% {
          transform: translateY(-75vh) translateX(calc(var(--drift, 0px) * 0.75)) rotate(calc(var(--rotation, 0deg) + 270deg)) scale(0.8);
        }
        95% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(var(--drift, 0px)) rotate(calc(var(--rotation, 0deg) + 360deg)) scale(0);
          opacity: 0;
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
    <div ref={containerRef} className="live-realistic-background">
      {/* Enhanced cosmic aurora gradient overlay with more realistic colors */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-900/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-yellow-900/25 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-orange-900/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '8s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-gradient-radial from-amber-800/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '12s' }}></div>
      </div>
      
      {/* More realistic cosmic grid overlay */}
      <div className="absolute inset-0 opacity-8" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px',
        animation: 'realistic-drift 180s linear infinite'
      }}></div>

      {/* Additional realistic atmospheric effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-amber-900/5 to-transparent animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-yellow-900/3 to-transparent animate-pulse" style={{ animationDuration: '20s', animationDelay: '5s' }}></div>
      </div>

      <style jsx>{`
        @keyframes realistic-drift {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          100% {
            transform: translateX(-120px) translateY(-120px);
          }
        }
        
        .live-realistic-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0f0a 15%, #2c1810 35%, #1a1a1a 55%, #0f0f0f 75%, #0a0a0a 100%);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LiveBackground;
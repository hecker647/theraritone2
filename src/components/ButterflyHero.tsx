import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, easeInOut } from 'framer-motion';
import { Camera, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ButterflyHeroProps {
  onAnimationComplete?: () => void;
}

const ButterflyHero: React.FC<ButterflyHeroProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Enhanced smooth transform values with better easing
  const butterflyY = useTransform(scrollY, [0, 800], [0, -400], { ease: easeInOut });
  const butterflyScale = useTransform(scrollY, [0, 800], [1, 0.5], { ease: easeInOut });
  const butterflyOpacity = useTransform(scrollY, [0, 400, 600], [1, 0.8, 0], { ease: easeInOut });
  const logoOpacity = useTransform(scrollY, [600, 800], [0, 1], { ease: easeInOut });
  const buttonsY = useTransform(scrollY, [0, 600], [0, -400], { ease: easeInOut });
  const buttonsOpacity = useTransform(scrollY, [0, 500], [1, 0], { ease: easeInOut });

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 850) {
        setIsVisible(false);
        setTimeout(() => {
          onAnimationComplete?.();
        }, 300);
      } else {
        setIsVisible(true);
      }
    });

    return unsubscribe;
  }, [scrollY, onAnimationComplete]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              y: butterflyY,
              scale: butterflyScale,
              opacity: butterflyOpacity,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.1 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 2 }
            }}
          >
            {/* RARITONE Logo positioned above butterfly - BIGGER SIZE */}
            <motion.div
              className="mb-12 z-30 relative"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 2.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.8
              }}
            >
              <img
                src="/Raritone.png"
                alt="RARITONE"
                className="h-32 sm:h-40 lg:h-48 xl:h-56 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.9))',
                }}
              />
            </motion.div>

            {/* Enhanced Ultra-Realistic Butterfly - FIXED VISIBILITY */}
            <motion.div
              className="relative mb-16 z-20"
              style={{
                width: '90vw',
                height: '70vh',
                maxWidth: '1000px',
                maxHeight: '700px',
              }}
              animate={{
                scale: [1, 1.02, 1],
                rotateY: [0, 1, 0, -1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut"
              }}
            >
              {/* Ultra-Realistic Butterfly SVG - ENHANCED VISIBILITY */}
              <svg
                viewBox="0 0 1000 800"
                className="w-full h-full"
                style={{ 
                  filter: 'drop-shadow(0 0 80px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.6))',
                  opacity: 1,
                  zIndex: 20
                }}
              >
                <defs>
                  {/* Enhanced Gradients for Ultra-Realistic Wing Patterns */}
                  <radialGradient id="upperWingGradient" cx="35%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                    <stop offset="15%" stopColor="rgba(255, 248, 220, 0.9)" />
                    <stop offset="30%" stopColor="rgba(255, 235, 180, 0.85)" />
                    <stop offset="50%" stopColor="rgba(255, 215, 140, 0.8)" />
                    <stop offset="70%" stopColor="rgba(255, 193, 100, 0.75)" />
                    <stop offset="85%" stopColor="rgba(255, 165, 60, 0.7)" />
                    <stop offset="100%" stopColor="rgba(255, 140, 20, 0.6)" />
                  </radialGradient>
                  
                  <radialGradient id="lowerWingGradient" cx="45%" cy="65%" r="55%">
                    <stop offset="0%" stopColor="rgba(255, 248, 220, 0.9)" />
                    <stop offset="25%" stopColor="rgba(255, 235, 180, 0.85)" />
                    <stop offset="50%" stopColor="rgba(255, 215, 140, 0.8)" />
                    <stop offset="75%" stopColor="rgba(255, 193, 100, 0.75)" />
                    <stop offset="100%" stopColor="rgba(255, 165, 60, 0.7)" />
                  </radialGradient>

                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 69, 19, 0.95)" />
                    <stop offset="25%" stopColor="rgba(160, 82, 45, 0.9)" />
                    <stop offset="50%" stopColor="rgba(205, 133, 63, 0.85)" />
                    <stop offset="75%" stopColor="rgba(160, 82, 45, 0.8)" />
                    <stop offset="100%" stopColor="rgba(101, 67, 33, 0.75)" />
                  </linearGradient>

                  <filter id="wingGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  <filter id="bodyTexture">
                    <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
                    <feColorMatrix in="noise" type="saturate" values="0"/>
                    <feComponentTransfer>
                      <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8"/>
                    </feComponentTransfer>
                    <feComposite operator="multiply" in2="SourceGraphic"/>
                  </filter>
                </defs>

                {/* Ultra-Realistic Butterfly Body with Segmentation */}
                <motion.g
                  animate={{
                    scaleY: [1, 1.02, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  {/* Main body with realistic texture */}
                  <ellipse cx="500" cy="400" rx="10" ry="140" fill="url(#bodyGradient)" filter="url(#bodyTexture)" />
                  
                  {/* Detailed body segments */}
                  <ellipse cx="500" cy="320" rx="8" ry="14" fill="rgba(139, 69, 19, 0.9)" />
                  <ellipse cx="500" cy="350" rx="9" ry="17" fill="rgba(160, 82, 45, 0.85)" />
                  <ellipse cx="500" cy="380" rx="10" ry="20" fill="rgba(205, 133, 63, 0.8)" />
                  <ellipse cx="500" cy="410" rx="9" ry="18" fill="rgba(160, 82, 45, 0.8)" />
                  <ellipse cx="500" cy="440" rx="8" ry="16" fill="rgba(139, 69, 19, 0.75)" />
                  <ellipse cx="500" cy="470" rx="7" ry="14" fill="rgba(101, 67, 33, 0.7)" />
                  
                  {/* Head with realistic details */}
                  <ellipse cx="500" cy="300" rx="10" ry="12" fill="rgba(101, 67, 33, 0.95)" />
                  
                  {/* Eyes */}
                  <circle cx="494" cy="295" r="3" fill="rgba(0, 0, 0, 0.9)" />
                  <circle cx="506" cy="295" r="3" fill="rgba(0, 0, 0, 0.9)" />
                  <circle cx="495" cy="294" r="1" fill="rgba(255, 255, 255, 0.8)" />
                  <circle cx="507" cy="294" r="1" fill="rgba(255, 255, 255, 0.8)" />
                </motion.g>
                
                {/* LEFT UPPER WING - Ultra-Realistic Shape and Movement */}
                <motion.path
                  d="M500 360 Q350 200 200 230 Q100 260 110 360 Q120 460 220 490 Q320 510 400 480 Q460 440 500 400"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(255, 215, 0, 0.8)"
                  strokeWidth="2"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M500 360 Q350 200 200 230 Q100 260 110 360 Q120 460 220 490 Q320 510 400 480 Q460 440 500 400",
                      "M500 360 Q345 195 195 225 Q95 255 105 355 Q115 455 215 485 Q315 505 395 475 Q455 435 500 400",
                      "M500 360 Q355 205 205 235 Q105 265 115 365 Q125 465 225 495 Q325 515 405 485 Q465 445 500 400",
                      "M500 360 Q350 200 200 230 Q100 260 110 360 Q120 460 220 490 Q320 510 400 480 Q460 440 500 400"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut"
                  }}
                />
                
                {/* RIGHT UPPER WING - Mirror with realistic movement */}
                <motion.path
                  d="M500 360 Q650 200 800 230 Q900 260 890 360 Q880 460 780 490 Q680 510 600 480 Q540 440 500 400"
                  fill="url(#upperWingGradient)"
                  stroke="rgba(255, 215, 0, 0.8)"
                  strokeWidth="2"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M500 360 Q650 200 800 230 Q900 260 890 360 Q880 460 780 490 Q680 510 600 480 Q540 440 500 400",
                      "M500 360 Q655 195 805 225 Q905 255 895 355 Q885 455 785 485 Q685 505 605 475 Q545 435 500 400",
                      "M500 360 Q645 205 795 235 Q895 265 885 365 Q875 465 775 495 Q675 515 595 485 Q535 445 500 400",
                      "M500 360 Q650 200 800 230 Q900 260 890 360 Q880 460 780 490 Q680 510 600 480 Q540 440 500 400"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
                
                {/* LEFT LOWER WING - Realistic hindwing */}
                <motion.path
                  d="M500 420 Q420 520 360 560 Q300 600 280 640 Q290 680 330 670 Q380 650 430 620 Q470 580 500 540"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(255, 193, 7, 0.7)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M500 420 Q420 520 360 560 Q300 600 280 640 Q290 680 330 670 Q380 650 430 620 Q470 580 500 540",
                      "M500 420 Q415 515 355 555 Q295 595 275 635 Q285 675 325 665 Q375 645 425 615 Q465 575 500 540",
                      "M500 420 Q425 525 365 565 Q305 605 285 645 Q295 685 335 675 Q385 655 435 625 Q475 585 500 540",
                      "M500 420 Q420 520 360 560 Q300 600 280 640 Q290 680 330 670 Q380 650 430 620 Q470 580 500 540"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />
                
                {/* RIGHT LOWER WING - Realistic hindwing */}
                <motion.path
                  d="M500 420 Q580 520 640 560 Q700 600 720 640 Q710 680 670 670 Q620 650 570 620 Q530 580 500 540"
                  fill="url(#lowerWingGradient)"
                  stroke="rgba(255, 193, 7, 0.7)"
                  strokeWidth="1.5"
                  filter="url(#wingGlow)"
                  animate={{
                    d: [
                      "M500 420 Q580 520 640 560 Q700 600 720 640 Q710 680 670 670 Q620 650 570 620 Q530 580 500 540",
                      "M500 420 Q585 515 645 555 Q705 595 725 635 Q715 675 675 665 Q625 645 575 615 Q535 575 500 540",
                      "M500 420 Q575 525 635 565 Q695 605 715 645 Q705 685 665 675 Q615 655 565 625 Q525 585 500 540",
                      "M500 420 Q580 520 640 560 Q700 600 720 640 Q710 680 670 670 Q620 650 570 620 Q530 580 500 540"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 0.9
                  }}
                />

                {/* Ultra-Realistic Wing Vein Patterns */}
                <motion.g
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                >
                  {/* Left wing detailed veins */}
                  <path d="M500 360 Q400 320 300 340" stroke="rgba(255, 165, 0, 0.9)" strokeWidth="1.5" fill="none" />
                  <path d="M480 380 Q380 360 280 380" stroke="rgba(255, 165, 0, 0.8)" strokeWidth="1.2" fill="none" />
                  <path d="M460 400 Q360 400 260 420" stroke="rgba(255, 165, 0, 0.7)" strokeWidth="1.2" fill="none" />
                  <path d="M440 420 Q340 440 240 460" stroke="rgba(255, 165, 0, 0.6)" strokeWidth="1" fill="none" />
                  
                  {/* Right wing detailed veins */}
                  <path d="M500 360 Q600 320 700 340" stroke="rgba(255, 165, 0, 0.9)" strokeWidth="1.5" fill="none" />
                  <path d="M520 380 Q620 360 720 380" stroke="rgba(255, 165, 0, 0.8)" strokeWidth="1.2" fill="none" />
                  <path d="M540 400 Q640 400 740 420" stroke="rgba(255, 165, 0, 0.7)" strokeWidth="1.2" fill="none" />
                  <path d="M560 420 Q660 440 760 460" stroke="rgba(255, 165, 0, 0.6)" strokeWidth="1" fill="none" />
                  
                  {/* Lower wing veins */}
                  <path d="M500 420 Q450 480 400 520" stroke="rgba(255, 193, 7, 0.7)" strokeWidth="1.2" fill="none" />
                  <path d="M500 420 Q550 480 600 520" stroke="rgba(255, 193, 7, 0.7)" strokeWidth="1.2" fill="none" />
                </motion.g>

                {/* Realistic Wing Spots and Patterns */}
                <motion.g
                  animate={{ 
                    opacity: [0.5, 0.9, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut"
                  }}
                >
                  {/* Upper wing spots */}
                  <circle cx="350" cy="360" r="18" fill="rgba(255, 140, 0, 0.8)" />
                  <circle cx="350" cy="360" r="10" fill="rgba(255, 69, 0, 0.9)" />
                  <circle cx="650" cy="360" r="18" fill="rgba(255, 140, 0, 0.8)" />
                  <circle cx="650" cy="360" r="10" fill="rgba(255, 69, 0, 0.9)" />
                  
                  {/* Lower wing spots */}
                  <circle cx="400" cy="500" r="12" fill="rgba(255, 165, 0, 0.7)" />
                  <circle cx="600" cy="500" r="12" fill="rgba(255, 165, 0, 0.7)" />
                </motion.g>
                
                {/* Ultra-Detailed Antennae */}
                <motion.g
                  animate={{ 
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M490 290 Q485 270 480 250 Q478 240 475 230" stroke="rgba(139, 69, 19, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M510 290 Q515 270 520 250 Q522 240 525 230" stroke="rgba(139, 69, 19, 0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  
                  {/* Antennae clubs with detail */}
                  <ellipse cx="475" cy="228" rx="4" ry="8" fill="rgba(101, 67, 33, 0.95)" />
                  <ellipse cx="525" cy="228" rx="4" ry="8" fill="rgba(101, 67, 33, 0.95)" />
                </motion.g>
              </svg>
            </motion.div>

            {/* Action Buttons - Positioned Below Butterfly */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 z-30"
              style={{
                y: buttonsY,
                opacity: buttonsOpacity,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              <motion.button
                className="flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/scan')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera size={20} />
                <span>Start Body Scan</span>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-3 border-2 border-gray-600 hover:border-amber-600 text-white hover:text-amber-600 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                onClick={() => navigate('/catalog')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span>Browse Collection</span>
              </motion.button>
            </motion.div>

            {/* Privacy Notice */}
            <motion.p
              className="text-sm text-gray-500 mt-8 text-center max-w-lg px-4 z-20"
              style={{ opacity: buttonsOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              This site uses webcam access to enable body scanning. Your camera data is never stored or shared.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ButterflyHero;
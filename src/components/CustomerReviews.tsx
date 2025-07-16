import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The AI body scan is incredible! Perfect fit every time. Revolutionary technology that changed how I shop.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time. Love the luxury experience and attention to detail!",
      avatar: "AP",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app I've ever used! The AI suggestions are spot-on.",
      avatar: "SR",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again. Absolutely perfect fit every single time!",
      avatar: "VS",
      location: "Pune"
    },
    {
      id: 5,
      name: "Ananya Gupta",
      rating: 5,
      comment: "The luxury feel and perfect fit recommendations are unmatched. Premium experience that exceeds expectations!",
      avatar: "AG",
      location: "Chennai"
    },
    {
      id: 6,
      name: "Rohit Kumar",
      rating: 5,
      comment: "Fast delivery, perfect sizing, and beautiful quality. RARITONE exceeded all my expectations and more!",
      avatar: "RK",
      location: "Hyderabad"
    },
    {
      id: 7,
      name: "Kavya Nair",
      rating: 5,
      comment: "The body scan technology is mind-blowing. Finally found clothes that fit perfectly without trying them on!",
      avatar: "KN",
      location: "Kochi"
    },
    {
      id: 8,
      name: "Aditya Joshi",
      rating: 5,
      comment: "Luxury fashion meets cutting-edge technology. The AI recommendations are incredibly accurate and helpful.",
      avatar: "AJ",
      location: "Jaipur"
    },
    {
      id: 9,
      name: "Meera Iyer",
      rating: 5,
      comment: "Outstanding customer service and the quality is exceptional. Every piece feels premium and fits perfectly.",
      avatar: "MI",
      location: "Bangalore"
    },
    {
      id: 10,
      name: "Karan Malhotra",
      rating: 5,
      comment: "The future of fashion shopping is here! RARITONE's technology is revolutionary and the clothes are amazing.",
      avatar: "KM",
      location: "Gurgaon"
    }
  ];

  return (
    <section className="py-16 sm:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
            <Star className="mr-4" size={40} color="#FFD700" />
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Join thousands of satisfied customers who love our AI-powered fashion experience. 
            Real reviews from real people across India.
          </p>
        </motion.div>
      </div>

      {/* SEAMLESS INFINITE SCROLLING REVIEWS - NO GAPS */}
      <div className="relative">
        {/* Gradient overlays for seamless effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-hidden">
          {/* First set of reviews */}
          <motion.div
            className="flex flex-shrink-0 gap-6"
            animate={{
              x: [0, -100 * reviews.length + '%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {reviews.map((review) => (
              <div
                key={`first-${review.id}`}
                className="flex-shrink-0 w-80 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ minWidth: '320px' }}
              >
                <div className="flex items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, #FFD700, #FFA500)`
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg text-white truncate">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {review.location}
                    </p>
                    <div className="flex mt-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star 
                            size={16} 
                            fill="#FFD700" 
                            color="#FFD700" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p 
                  className="text-gray-300 leading-relaxed text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{review.comment}"
                </motion.p>
              </div>
            ))}
          </motion.div>

          {/* Second set of reviews for seamless loop */}
          <motion.div
            className="flex flex-shrink-0 gap-6"
            animate={{
              x: [0, -100 * reviews.length + '%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {reviews.map((review) => (
              <div
                key={`second-${review.id}`}
                className="flex-shrink-0 w-80 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{ minWidth: '320px' }}
              >
                <div className="flex items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, #FFD700, #FFA500)`
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg text-white truncate">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {review.location}
                    </p>
                    <div className="flex mt-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star 
                            size={16} 
                            fill="#FFD700" 
                            color="#FFD700" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p 
                  className="text-gray-300 leading-relaxed text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{review.comment}"
                </motion.p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
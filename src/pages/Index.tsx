import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import ButterflyHero from '@/components/ButterflyHero';
import LiveBackground from '@/components/LiveBackground';
import CustomerReviews from '@/components/CustomerReviews';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { scrollY } = useScroll();

  // Enhanced smooth scroll transforms for butterfly animation
  const butterflyY = useTransform(scrollY, [0, 800], [0, -600]);
  const butterflyScale = useTransform(scrollY, [0, 800], [1, 0.2]);
  const butterflyOpacity = useTransform(scrollY, [0, 600, 800], [1, 0.8, 0]);

  // Navbar visibility based on scroll - more accurate timing
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setNavbarVisible(latest > 850);
    });
    return unsubscribe;
  }, [scrollY]);

  const handleButterflyAnimationComplete = () => {
    setNavbarVisible(true);
  };

  // Handle add to cart from modal
  const handleAddToCart = async (product: any, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.image
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      addToLocalCart(cartItem);
    }

    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Raritone Collection Categories
  const categories = [
    {
      id: 'tops',
      name: 'Oversized T-Shirts',
      image: '/Raritone Collection/Bold vibe Oversize Tshirt.jpg',
      count: '15+ Designs'
    },
    {
      id: 'hoodies',
      name: 'Premium Hoodies',
      image: '/Raritone Collection/Hoddie1(F).jpg',
      count: '8+ Styles'
    },
    {
      id: 'graphics',
      name: 'Graphic Tees',
      image: '/Raritone Collection/Kiss me again.jpeg',
      count: '12+ Prints'
    },
    {
      id: 'minimal',
      name: 'Minimal Collection',
      image: '/Raritone Collection/Minimal look Oversize Tshirt.jpg',
      count: '10+ Items'
    }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Enhanced Live Background */}
      <LiveBackground />

      {/* Navigation - Synced with butterfly animation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
        isVisible={navbarVisible}
      />

      {/* Hero Section with Enhanced Butterfly */}
      <div className="relative min-h-screen flex flex-col items-center justify-center z-10">
        <ButterflyHero onAnimationComplete={handleButterflyAnimationComplete} />
      </div>

      {/* Shop by Category Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our exclusive Raritone collections designed for every style and occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/catalog?category=${category.id}`)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-gray-300 text-sm">{category.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Models Section */}
      <div className="relative z-10 py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Wear the Difference</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience premium fashion that speaks to your style. Our collections are designed for those who appreciate quality and uniqueness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Model wearing Raritone collection"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Premium Quality</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Every piece in our collection is crafted with meticulous attention to detail, 
                  using only the finest materials to ensure comfort, durability, and style.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Unique Designs</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our exclusive designs are created to make you stand out. From bold graphics 
                  to minimalist aesthetics, find your perfect style expression.
                </p>
              </div>
              
              <motion.button
                className="bg-amber-600 hover:bg-amber-700 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/catalog')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* New Brand Models Showcase Section */}
      <div className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Style in Action</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how our premium collections look and feel in real life. Our models showcase the versatility and elegance of RARITONE fashion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Model 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Model wearing RARITONE oversized t-shirt"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Bold Vibe Collection</h3>
                <p className="text-gray-300 text-sm mb-3">Oversized comfort meets street style</p>
                <button
                  onClick={() => navigate('/catalog?category=tops')}
                  className="bg-amber-600 hover:bg-amber-700 text-black font-medium px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </motion.div>

            {/* Model 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Model wearing RARITONE hoodie"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Premium Hoodies</h3>
                <p className="text-gray-300 text-sm mb-3">Luxury comfort for every season</p>
                <button
                  onClick={() => navigate('/catalog?category=hoodies')}
                  className="bg-amber-600 hover:bg-amber-700 text-black font-medium px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </motion.div>

            {/* Model 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Model wearing RARITONE minimal collection"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Minimal Elegance</h3>
                <p className="text-gray-300 text-sm mb-3">Timeless designs for modern living</p>
                <button
                  onClick={() => navigate('/catalog?category=minimal')}
                  className="bg-amber-600 hover:bg-amber-700 text-black font-medium px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <motion.button
              className="bg-white text-black font-semibold px-12 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate('/catalog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Collection
            </motion.button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 sm:py-20 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-2xl p-8 sm:p-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.img
                  src="/Raritone.png"
                  alt="RARITONE"
                  className="h-16 sm:h-20 w-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                />
                <p className="text-gray-300 max-w-md leading-relaxed text-sm sm:text-base">
                  Premium fashion collection with exceptional quality and style. 
                  Experience luxury fashion with personalized service across India.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-base sm:text-lg">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { label: 'About Us', href: '/quick-links' },
                    { label: 'Write Review', href: '/write-review' },
                    { label: 'Privacy Policy', href: '/quick-links' },
                    { label: 'Returns & Exchanges', href: '/returns' },
                    { label: 'Contact Us', href: '/contact' }
                  ].map((link) => (
                    <li key={link.label}>
                      <motion.button 
                        onClick={() => navigate(link.href)}
                        className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors text-left"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-white mb-6 text-base sm:text-lg">Contact</h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">hello@raritone.in</p>
                  <p className="text-gray-300 text-sm sm:text-base">+91 98765 43210</p>
                  <p className="text-gray-300 text-sm sm:text-base">Mumbai, India</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 mt-12 pt-8 text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2025 RARITONE. All rights reserved. | Premium Fashion Collection | Made in India
              </p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={() => {}}
      />

      {/* Add to Cart Toast */}
      <AddToCartToast
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
        item={cartToastItem}
        onViewCart={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
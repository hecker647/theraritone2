import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const WriteReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    productName: '',
    title: '',
    review: '',
    wouldRecommend: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      showToast({
        type: 'warning',
        title: 'Rating Required',
        message: 'Please select a star rating for your review.'
      });
      return;
    }

    if (!reviewData.review.trim()) {
      showToast({
        type: 'warning',
        title: 'Review Required',
        message: 'Please write your review before submitting.'
      });
      return;
    }

    // Simulate review submission
    showToast({
      type: 'success',
      title: 'Review Submitted!',
      message: 'Thank you for your review. It will be published after moderation.'
    });

    // Reset form
    setRating(0);
    setReviewData({
      name: user?.displayName || '',
      email: user?.email || '',
      productName: '',
      title: '',
      review: '',
      wouldRecommend: true
    });
  };

  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`transition-colors ${
                star <= (hoveredRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Write Review"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Star size={32} className="mr-3 text-yellow-400" />
              <h1 className="text-3xl font-semibold text-[rgb(236,223,204)]">Write a Review</h1>
            </div>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto">
              Share your experience with RARITONE products. Your feedback helps other customers make informed decisions.
            </p>
          </div>

          {/* Review Form */}
          <div className="rounded-lg shadow-sm p-8 border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[rgb(236,223,204)]">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={reviewData.name}
                    onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                    required
                    className="mt-2 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[rgb(236,223,204)]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={reviewData.email}
                    onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
                    required
                    className="mt-2 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div>
                <Label htmlFor="productName" className="text-[rgb(236,223,204)]">Product Name (Optional)</Label>
                <Input
                  id="productName"
                  type="text"
                  value={reviewData.productName}
                  onChange={(e) => setReviewData({...reviewData, productName: e.target.value})}
                  className="mt-2 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                  placeholder="Which product are you reviewing?"
                />
              </div>

              {/* Rating */}
              <div>
                <Label className="text-[rgb(236,223,204)] block mb-3">Overall Rating *</Label>
                <div className="flex items-center space-x-4">
                  <StarRating />
                  <span className="text-[rgb(105,117,101)] text-sm">
                    {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
                  </span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <Label htmlFor="title" className="text-[rgb(236,223,204)]">Review Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                  className="mt-2 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                  placeholder="Summarize your experience in a few words"
                />
              </div>

              {/* Review Text */}
              <div>
                <Label htmlFor="review" className="text-[rgb(236,223,204)]">Your Review *</Label>
                <textarea
                  id="review"
                  value={reviewData.review}
                  onChange={(e) => setReviewData({...reviewData, review: e.target.value})}
                  required
                  rows={6}
                  className="mt-2 w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
                  placeholder="Tell us about your experience with this product. What did you like? How was the quality, fit, and overall satisfaction?"
                />
                <p className="text-xs text-[rgb(105,117,101)] mt-1">
                  Minimum 50 characters ({reviewData.review.length}/50)
                </p>
              </div>

              {/* Recommendation */}
              <div>
                <Label className="text-[rgb(236,223,204)] block mb-3">Would you recommend this product?</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={reviewData.wouldRecommend === true}
                      onChange={() => setReviewData({...reviewData, wouldRecommend: true})}
                      className="text-[rgb(105,117,101)]"
                    />
                    <span className="text-[rgb(236,223,204)]">Yes, I would recommend</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={reviewData.wouldRecommend === false}
                      onChange={() => setReviewData({...reviewData, wouldRecommend: false})}
                      className="text-[rgb(105,117,101)]"
                    />
                    <span className="text-[rgb(236,223,204)]">No, I would not recommend</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)] flex items-center space-x-2"
                >
                  <Send size={18} />
                  <span>Submit Review</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Guidelines */}
          <div className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Review Guidelines</h3>
            <div className="space-y-3 text-sm text-[rgb(105,117,101)]">
              <div className="flex items-start space-x-2">
                <User size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[rgb(236,223,204)]">Be Honest & Helpful</div>
                  <div>Share your genuine experience to help other customers make informed decisions.</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <ShoppingBag size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[rgb(236,223,204)]">Focus on the Product</div>
                  <div>Write about product quality, fit, comfort, and overall satisfaction.</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Star size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[rgb(236,223,204)]">Keep it Respectful</div>
                  <div>Avoid inappropriate language and personal attacks. Focus on constructive feedback.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews Preview */}
          <div className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Recent Customer Reviews</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Priya S.",
                  rating: 5,
                  title: "Amazing Quality!",
                  review: "The fabric quality is exceptional and the fit is perfect. Highly recommend!",
                  product: "Bold Vibe Oversize T-shirt"
                },
                {
                  name: "Arjun P.",
                  rating: 5,
                  title: "Love the Design",
                  review: "Unique designs and great comfort. Will definitely order more.",
                  product: "Premium Hoodie"
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-[rgb(105,117,101)] pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-[rgb(236,223,204)]">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-[rgb(105,117,101)]">{review.product}</span>
                  </div>
                  <h4 className="font-medium text-[rgb(236,223,204)] mb-1">{review.title}</h4>
                  <p className="text-sm text-[rgb(105,117,101)]">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WriteReview;
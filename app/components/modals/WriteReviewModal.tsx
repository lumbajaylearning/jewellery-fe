import React, { useState } from 'react';
import { X, Star, Upload, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '@/app/types/product';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [variant, setVariant] = useState('18K Yellow Gold / Size 8');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: author || 'Fine Jewellery Client',
      location: location || 'India',
      verified: true,
      rating,
      title: title || 'Exceptional Fine Solitaire',
      date: 'Today',
      comment,
      helpfulCount: 0,
      ringVariant: variant,
      metal: 'Yellow Gold'
    };

    onSubmitReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F4] rounded-md border border-[#E5DEC9] shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-5 border-b border-[#EAE3D4] bg-[#F1ECE4]">
          <div>
            <h3 className="font-serif text-lg text-[#1C1917] tracking-tight">
              Write a Verified Customer Review
            </h3>
            <p className="text-xs text-[#78716C]">
              Share your thoughts on diamond fire, gold finish, or your in-home trial.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#EAE3D4]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-lg text-[#1C1917]">Review Submitted with Thanks</h4>
            <p className="text-xs text-[#78716C]">Your verified review is now visible under Customer Stories.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Rating Stars */}
            <div>
              <label className="text-[#1C1917] font-medium block mb-1">Your Overall Rating</label>
              <div className="flex text-[#9E7D47] gap-1 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${(hoverRating || rating) >= star ? 'fill-current' : 'text-[#D6CEBC]'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#1C1917] font-medium block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shalini Roy"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#FAF8F4] border border-[#D9CEBA] p-2.5 rounded focus:outline-none focus:border-[#1C1917]"
                />
              </div>
              <div>
                <label className="text-[#1C1917] font-medium block mb-1">City, State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Maharashtra"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#FAF8F4] border border-[#D9CEBA] p-2.5 rounded focus:outline-none focus:border-[#1C1917]"
                />
              </div>
            </div>

            <div>
              <label className="text-[#1C1917] font-medium block mb-1">Review Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. The diamond brilliance is extraordinary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#FAF8F4] border border-[#D9CEBA] p-2.5 rounded focus:outline-none focus:border-[#1C1917]"
              />
            </div>

            <div>
              <label className="text-[#1C1917] font-medium block mb-1">Detailed Review</label>
              <textarea
                rows={3}
                required
                placeholder="Tell us about the craftsmanship, comfort fit, packaging, or customer service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#FAF8F4] border border-[#D9CEBA] p-2.5 rounded focus:outline-none focus:border-[#1C1917]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3 rounded font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Post Verified Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

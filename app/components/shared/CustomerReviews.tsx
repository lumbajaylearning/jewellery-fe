import React from 'react';
import { Sparkles, Quote, ShieldCheck } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const stories = [
    {
      id: 'story-1',
      author: 'Ananya S.',
      location: 'Bengaluru',
      occasion: 'Festive Dhanteras Gift',
      comment: 'The floral motif is even more intricate in person. The 22K yellow gold has that authentic warm radiance, and having the digital BIS 916 Hallmark certificate provided complete peace of mind.',
      purity: '22K (916) Hallmark'
    },
    {
      id: 'story-2',
      author: 'Pooja M.',
      location: 'Mumbai',
      occasion: 'Daily Elegance',
      comment: 'Ordered through the in-home trial service first to check the size and feel. The filigree craftsmanship and comfortable band finish are truly exceptional.',
      purity: '22K (916) Hallmark'
    },
    {
      id: 'story-3',
      author: 'Kavita R.',
      location: 'New Delhi',
      occasion: 'Family Heirloom Addition',
      comment: 'Transparent price breakup with live gold rates made the buying decision so straightforward. It pairs gracefully with my traditional sarees as well as contemporary wear.',
      purity: '22K (916) Hallmark'
    }
  ];

  return (
    <section id="customer-reviews" aria-labelledby="customer-stories-heading" className="w-full bg-[#FAF8F4] py-12 border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header requested by user */}
        <div className="text-center sm:text-left border-b border-[#E5DEC9] pb-6">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-[#9E7D47] uppercase block">
            Real Experiences
          </span>
          <h2 id="customer-stories-heading" className="text-2xl sm:text-3xl font-serif text-[#1C1917] tracking-tight mt-1">
            Customer Stories
          </h2>
          <p className="text-sm text-[#57534E] mt-1.5 font-normal">
            Verified buyers sharing their memories and fine jewellery trials.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FFFFFF] border border-[#E5DEC9] p-6 rounded-md shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-5 h-5 text-[#9E7D47]/60" />
                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic">
                  "{story.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1ECE4] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#1C1917]">
                    {story.author}
                  </div>
                  <div className="text-[11px] text-[#78716C]">
                    {story.location} • {story.occasion}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{story.purity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

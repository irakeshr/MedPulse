import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const CATEGORIES = [
  {
    id: 1,
    title: "Mental Health",
    count: "2.4k Discussions",
    icon: "psychology",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    hover: "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30",
    link: "/community/mental-health"
  },
  {
    id: 2,
    title: "Nutrition",
    count: "1.8k Discussions",
    icon: "nutrition",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    hover: "group-hover:bg-green-100 dark:group-hover:bg-green-900/30",
    link: "/community/nutrition"
  },
  {
    id: 3,
    title: "Chronic Care",
    count: "950 Discussions",
    icon: "cardiology",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    hover: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
    link: "/community/chronic-care"
  },
  {
    id: 4,
    title: "Lifestyle",
    count: "3.1k Discussions",
    icon: "fitness_center",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    hover: "group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30",
    link: "/community/lifestyle"
  },
  // Added extra items to demonstrate scrolling
  {
    id: 5,
    title: "Dermatology",
    count: "1.2k Discussions",
    icon: "dermatology",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    hover: "group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30",
    link: "/community/dermatology"
  },
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll Handler (Left/Right Buttons)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200; // Adjust scroll distance
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Track scroll position to update dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculate which "page" we are mostly on
      const index = Math.round(scrollLeft / (clientWidth / 2)); 
      // Clamp index to avoid overflow errors
      const safeIndex = Math.min(Math.max(index, 0), CATEGORIES.length - 1);
      setActiveIndex(safeIndex);
    }
  };

  return (
    <section className="relative">
      
      {/* --- Header with Arrows --- */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-med-dark dark:text-white">Browse Categories</h3>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] hover:bg-med-gray dark:hover:bg-[#1a2c2c] text-med-text-secondary dark:text-gray-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full bg-white dark:bg-[#253636] border border-[#e5e7eb] dark:border-[#2a3838] hover:bg-med-gray dark:hover:bg-[#1a2c2c] text-med-text-secondary dark:text-gray-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* --- Scroll Container --- */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        {CATEGORIES.map((cat) => (
          <Link 
            key={cat.id} 
            to={cat.link}
            className="shrink-0 w-[45%] md:w-[23%] snap-start group"
          >
            <div className="bg-white dark:bg-[#1a2c2c] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3838] hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm h-full flex flex-col">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors ${cat.bg} ${cat.hover}`}>
                <span className={`material-symbols-outlined ${cat.color}`}>{cat.icon}</span>
              </div>
              <h4 className="font-semibold text-sm text-med-dark dark:text-white">{cat.title}</h4>
              <p className="text-xs text-med-text-secondary dark:text-gray-500 mt-1">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* --- Dots Indicator --- */}
      <div className="flex justify-center gap-1.5 mt-2">
        {CATEGORIES.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              // Simplified dot logic: Show active dot and neighbors
              // In a real carousel, you might map pages, not items. 
              // Here we map items for a visual "progress" effect.
              idx === activeIndex 
                ? "w-4 bg-primary" 
                : "w-1.5 bg-med-gray dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default CategoryCarousel;
import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { track } from '@vercel/analytics';

interface SplitViewCardProps {
  originalImage: string;
  coloredImage: string;
  title: string;
  description: string;
  shouldAnimate: boolean;
  originalLabel?: string;
  coloredLabel?: string;
}

const SplitViewCard: React.FC<SplitViewCardProps> = ({
  originalImage,
  coloredImage,
  title,
  description,
  shouldAnimate,
  originalLabel = 'Memory',
  coloredLabel = 'Coloring',
}) => {
  const [sliderPosition, setSliderPosition] = useState(5);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientY: number) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const percent = (y / rect.height) * 100;
    setSliderPosition(percent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      // Track first interaction with this example
      track('example_card_interaction', {
        title: title,
        interaction_type: 'mouse_drag'
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      // Track first interaction with this example
      track('example_card_interaction', {
        title: title,
        interaction_type: 'touch_drag'
      });
    }
  };

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    imageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    imageContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      imageContainer.removeEventListener('touchmove', handleTouchMove);
      imageContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldAnimate && !hasInteracted) {
      const timeouts = [
        setTimeout(() => setSliderPosition(15), 1000),
        setTimeout(() => setSliderPosition(5), 2000),
      ];

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [shouldAnimate, hasInteracted]);

  return (
    <div ref={containerRef} className="group cursor-pointer">
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-[3/4] select-none overflow-hidden rounded-2xl bg-gray-800 mb-6 shadow-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Colored Image (Bottom Layer) */}
        <img
          src={coloredImage}
          alt={`${title} (Coloring Version)`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Original Image (Top Layer) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            clipPath: `inset(${sliderPosition}% 0 0 0)`,
            transition: isDragging || !isVisible ? 'none' : 'clip-path 1s ease-in-out',
          }}
        >
          <img
            src={originalImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Labels */}
        <div
          className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-20 transition-opacity duration-300"
          style={{opacity: sliderPosition < 50 ? 1 : 0}}
        >
          {originalLabel}
        </div>
        <div
          className="absolute top-2 left-2 bg-blue-600/80 text-white text-xs px-2 py-1 rounded z-20 transition-opacity duration-300"
          style={{opacity: sliderPosition >= 50 ? 1 : 0}}
        >
          {coloredLabel}
        </div>


        {/* Slider Handle */}
        <div
          className="absolute left-0 right-0 h-1 bg-white/50 cursor-ns-resize pointer-events-none z-10"
          style={{
            top: `${sliderPosition}%`,
            transform: 'translateY(-50%)',
            transition: isDragging || !isVisible ? 'none' : 'top 1s ease-in-out'
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-md">
            <ChevronsUpDown size={20} />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SplitViewCard; 
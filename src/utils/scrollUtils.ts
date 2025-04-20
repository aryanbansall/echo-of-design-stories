
// A utility for handling scroll animations and effects

// Observe elements and apply animations when they enter viewport
export const setupScrollObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, observerOptions);

  // Select elements with scroll-reveal class
  const elements = document.querySelectorAll('.scroll-reveal');
  elements.forEach(el => observer.observe(el));

  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
};

// Add a smooth scroll behavior to anchor links
export const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (!href) return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 100, // Account for header
        behavior: 'smooth'
      });
    });
  });
};

// Track scroll progress for progress indicators
export const getScrollProgress = (): number => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
};

// Determine if user has scrolled past a certain point
export const hasScrolledPast = (offsetY: number): boolean => {
  return window.scrollY > offsetY;
};

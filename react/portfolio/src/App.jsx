import React, { useEffect, useRef } from 'react';
import ProjectCard from './components/ProjectCard';

function App() {
  const profileRef = useRef(null);
  const projectsRef = useRef(null);
  const scrollLocked = useRef(false);

  useEffect(() => {
    // Intersection Observer for other animated elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
          } else {
            entry.target.classList.remove("visible");
            entry.target.classList.add("hidden");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Scroll Progress Indicator (removed)
    // No longer needed as per user request

    // Custom Scroll Snapping Logic (disabled on mobile)
    const handleWheel = (e) => {
      // Check if it's a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      
      if (isMobile) {
        return; // Don't apply custom scroll behavior on mobile
      }
      
      if (scrollLocked.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? "down" : "up";
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (direction === "down" && scrollY < vh - 10) {
        scrollLocked.current = true;
        e.preventDefault();
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          scrollLocked.current = false;
        }, 1000);
      } else if (direction === "up" && scrollY >= vh - 10) {
        scrollLocked.current = true;
        e.preventDefault();
        profileRef.current?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          scrollLocked.current = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="fullscreen-section" id="profile" ref={profileRef}>
        <div className="container animate-up">
          <div className="profile">
            <img src="/Default_pfp.jpg" alt="Rishav" />
            <h1 id="name">Rishav Chaudhary</h1>
            <a href="https://maps.app.goo.gl/pQqL7EJ1EzXHEZJF8" id="Address" target="_blank" rel="noopener noreferrer">
              📍Nepal , Lalitpur
            </a>
          </div>

          <div className="links">
            <a href="https://github.com/crrishav" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="https://instagram.com/crrishav" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>

          <div className="scroll-hint">
            <p>My Projects</p>
            <div className="arrow">↓</div>
          </div>
        </div>
      </section>

      <section className="fullscreen-section" id="projects" ref={projectsRef}>
        {/* My Projects title is at the top-center */}
        <h2 className="section-heading animate-on-scroll animate-delay-1">My Projects</h2>

        <div className="projects-grid">
          <ProjectCard
            title="Next-Gen Calculator"
            description="A futuristic calculator with smooth animations and advanced features."
            link="https://github.com/GGRISHAV/flutter-calculator"
            imageUrl="https://images.unsplash.com/photo-1587145820266-a5951ee6f670?auto=format&fit=crop&q=80&w=600"
            delayClass="animate-delay-2"
          />

          <ProjectCard
            title="Social Feed Pro"
            description="A highly aesthetic and responsive social media feed application."
            link="https://github.com/GGRISHAV/instaclone"
            imageUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600"
            delayClass="animate-delay-3"
          />

          <ProjectCard
            title="Creative Portfolio"
            description="A premium portfolio template designed for developers and designers."
            link="https://github.com/GGRISHAV/portfolio"
            imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
            delayClass="animate-delay-4"
          />
        </div>

        {/* Source Code text at the bottom center */}
        <p className="source-code animate-on-scroll animate-delay-5">
          <a href="https://github.com/crrishav/portfolio-main" target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        </p>
      </section>
    </>
  );
}

export default App;

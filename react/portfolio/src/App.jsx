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
      { threshold: 0.2 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Custom Scroll Snapping Logic
    const handleWheel = (e) => {
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
            <a href="https://github.com/GGRISHAV" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="https://instagram.com/crrishav" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>

          <div className="scroll-hint">
            <p>My Projects</p>
            <div className="arrow">⬇️</div>
          </div>
        </div>
      </section>

      <section className="fullscreen-section" id="projects" ref={projectsRef}>
        <div className="projects-section animate-up">
          <h2 className="section-heading animate-on-scroll animate-delay-1">My Projects</h2>

          <div className="projects-grid">
            <ProjectCard
              title="Flutter Calculator"
              description="A simple yet fully functional calculator app built using Flutter. It features a custom BounceButton widget, haptic feedback, and a dedicated settings page for customization."
              link="https://github.com/GGRISHAV/flutter-calculator"
              delayClass="animate-delay-2"
            />

            <ProjectCard
              title="Instaclone"
              description="A work-in-progress Instagram clone built with Flutter. The project aims to replicate core features of the original app, focusing on UI and essential functionality."
              link="https://github.com/GGRISHAV/instaclone"
              delayClass="animate-delay-3"
            />

            <ProjectCard
              title="Coming soon.."
              description="Work in progress"
              delayClass="animate-delay-4"
            />
          </div>

          <p className="source-code animate-on-scroll animate-delay-5">
            <a href="https://github.com/GGRISHAV/portfolio" target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

export default App;

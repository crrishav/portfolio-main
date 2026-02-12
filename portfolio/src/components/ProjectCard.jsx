import React, { useEffect, useRef } from 'react';

const ProjectCard = ({ title, description, link, imageUrl, delayClass }) => {
    const cardRef = useRef(null);

    useEffect(() => {
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

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`project-card animate-on-scroll ${delayClass}`}
            ref={cardRef}
        >
            <div className="project-card-image-container">
                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"}
                    alt={title}
                    className="project-card-image"
                />
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-overlay"
                >
                    <i className="fas fa-external-link-alt"></i>
                </a>
            </div>
            <div className="project-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ProjectCard;

import React, { useEffect, useRef } from 'react';

const ProjectCard = ({ title, description, link, delayClass }) => {
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
            { threshold: 0.2 }
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

    const content = (
        <>
            <h3>{title}</h3>
            <p>{description}</p>
        </>
    );

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card animate-on-scroll ${delayClass}`}
                ref={cardRef}
            >
                {content}
            </a>
        );
    }

    return (
        <div className={`project-card animate-on-scroll ${delayClass}`} ref={cardRef}>
            {content}
        </div>
    );
};

export default ProjectCard;

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  category: "WEB" | "OTHER";
  description: string;
  accent: string;
  badge: string;
  technologies: string[];
  action: string;
};

const projects: Project[] = [
  {
    title: "Gestion de carrière & IA",
    category: "WEB",
    description:
      "Application fullstack de gestion RH notée Excellent. Authentification Spring Security + reCAPTCHA, dashboard prédictif TensorFlow, tests Cypress en sprints Agile/Scrum.",
    accent: "#f7768e",
    badge: "WEB",
    technologies: ["Angular", "PrimeNG", "Spring Boot", "TensorFlow", "PostgreSQL"],
    action: "Front",
  },
  {
    title: "Calculateur de Taxe Locale",
    category: "WEB",
    description:
      "API REST sécurisée JWT + Spring Security, déploiement complet en production (Railway / Netlify / Neon) et pipeline CI/CD GitHub Actions avec tests JUnit/Mockito.",
    accent: "#bb9af7",
    badge: "WEB",
    technologies: ["Angular", "Spring Boot", "JWT / Security", "GitHub Actions", "PostgreSQL Neon"],
    action: "Backend",
  },
  {
    title: "Librairie Next-Gen",
    category: "WEB",
    description:
      "Site e-commerce avec espaces client et admin distincts. Catalogue, commandes, avis, réclamations et paiement en ligne sécurisé via Stripe.",
    accent: "#9ece6a",
    badge: "WEB",
    technologies: ["Symfony", "Stripe", "MySQL", "JavaScript"],
    action: "GitHub",
  },
  {
    title: "Intersection Intelligente",
    category: "OTHER",
    description:
      "Simulation temps réel d'une intersection à 4 voies : feux adaptatifs, priorité ambulance, gestion piéton, météo et détection de collisions. Architecture MVC.",
    accent: "#ff9e64",
    badge: "OTHER",
    technologies: ["Python", "Pygame", "NumPy", "SQLite"],
    action: "GitHub",
  },
  {
    title: "Portfolio OS",
    category: "OTHER",
    description:
      "Portfolio interactif façon système d'exploitation. Interface desktop avec fenêtres draggables, dock et navigation immersive.",
    accent: "#7dcfff",
    badge: "OTHER",
    technologies: ["React", "CSS", "Netlify"],
    action: "GitHub",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");
  const treeRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const webRef = useRef<HTMLDivElement | null>(null);
  const otherRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const title = "Mes réalisations";
    let index = 0;

    const tick = () => {
      setTypedText(title.slice(0, index));
      index += 1;
      if (index <= title.length) {
        window.setTimeout(tick, 42);
      }
    };

    tick();
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      const tree = treeRef.current;
      const root = rootRef.current;
      const web = webRef.current;
      const other = otherRef.current;
      const webPath = document.getElementById("pathWeb") as SVGPathElement | null;
      const otherPath = document.getElementById("pathOther") as SVGPathElement | null;

      if (!tree || !root || !web || !other || !webPath || !otherPath) return;

      const treeRect = tree.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const webRect = web.getBoundingClientRect();
      const otherRect = other.getBoundingClientRect();

      const x0 = rootRect.left + rootRect.width / 2 - treeRect.left;
      const y0 = rootRect.bottom - treeRect.top;

      const pathTo = (target: DOMRect) => {
        const x1 = target.left + target.width / 2 - treeRect.left;
        const y1 = target.top - treeRect.top;
        const midY = y0 + (y1 - y0) * 0.55;
        return `M ${x0} ${y0} C ${x0} ${midY}, ${x1} ${midY}, ${x1} ${y1}`;
      };

      webPath.setAttribute("d", pathTo(webRect));
      otherPath.setAttribute("d", pathTo(otherRect));

      const lenWeb = webPath.getTotalLength();
      const lenOther = otherPath.getTotalLength();
      webPath.style.strokeDasharray = `${lenWeb}`;
      webPath.style.strokeDashoffset = `${lenWeb}`;
      otherPath.style.strokeDasharray = `${lenOther}`;
      otherPath.style.strokeDashoffset = `${lenOther}`;
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, []);

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tree.classList.add("project-showcase__tree--in");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(tree);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-showcase" ref={treeRef}>
      <div className="project-showcase__header">
        <div className="project-showcase__path-line">
          ~/ <span className="project-showcase__path-highlight">portfolio</span>
          <span className="project-showcase__path-sep">/</span>projects
          <span className="project-showcase__path-sep">.</span>show()
        </div>

        <h2 className="project-showcase__title">
          <span className="project-showcase__comment">// </span>
          <span className="project-showcase__typed">{typedText}</span>
        </h2>

        <p className="project-showcase__sub">
          Une arborescence de ce que j&apos;ai construit — du front au back, en passant par quelques
          expériences à part.
        </p>
      </div>

      <div className="project-showcase__tree">
        <svg className="project-showcase__links" aria-hidden="true">
          <path id="pathWeb" />
          <path id="pathOther" />
        </svg>

        <div className="project-showcase__root-row">
          <div className="project-showcase__node project-showcase__root-node" ref={rootRef}>
            <span className="project-showcase__folder-ico" />
            mes-projets
          </div>
        </div>

        <div className="project-showcase__branches">
          <div className="project-showcase__col" data-col="web">
            <div className="project-showcase__folder-head">
              <div className="project-showcase__node" ref={webRef}>
                <span className="project-showcase__folder-ico" />
                web
              </div>
            </div>

            <div className="project-showcase__cards">
              {projects
                .filter((project) => project.category === "WEB")
                .map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -14, y: 8 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 0.8, 0.24, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    className="project-showcase__card"
                    style={{ ["--accent" as string]: project.accent }}
                  >
                    <div className="project-showcase__card-head">
                      <span className="project-showcase__file-ico" />
                      <span className="project-showcase__card-title">{project.title}</span>
                    </div>

                    <p className="project-showcase__card-desc">{project.description}</p>

                    <div className="project-showcase__tags">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="project-showcase__tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-showcase__actions">
                      <a href="#" className="project-showcase__btn">
                        {project.action}
                      </a>
                      <a href="#" className="project-showcase__btn project-showcase__btn--gh">
                        GitHub
                      </a>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>

          <div className="project-showcase__col" data-col="other">
            <div className="project-showcase__folder-head">
              <div className="project-showcase__node" ref={otherRef}>
                <span className="project-showcase__folder-ico" />
                other
              </div>
            </div>

            <div className="project-showcase__cards">
              {projects
                .filter((project) => project.category === "OTHER")
                .map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -14, y: 8 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 0.8, 0.24, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    className="project-showcase__card"
                    style={{ ["--accent" as string]: project.accent }}
                  >
                    <div className="project-showcase__card-head">
                      <span className="project-showcase__file-ico" />
                      <span className="project-showcase__card-title">{project.title}</span>
                    </div>

                    <p className="project-showcase__card-desc">{project.description}</p>

                    <div className="project-showcase__tags">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="project-showcase__tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-showcase__actions">
                      <a href="#" className="project-showcase__btn">
                        {project.action}
                      </a>
                      <a href="#" className="project-showcase__btn project-showcase__btn--gh">
                        GitHub
                      </a>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .project-showcase {
          position: relative;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 0 120px;
          color: #e7edf6;
        }

        .project-showcase__header {
          text-align: center;
          margin-bottom: 76px;
        }

        .project-showcase__path-line {
          font-size: 13px;
          letter-spacing: 0.02em;
          color: rgba(218, 224, 235, 0.42);
          font-family: "JetBrains Mono", "SFMono-Regular", monospace;
          margin-bottom: 18px;
        }

        .project-showcase__path-highlight {
          color: #c9b5ff;
        }

        .project-showcase__path-sep {
          color: rgba(255, 255, 255, 0.2);
          margin: 0 2px;
        }

        .project-showcase__title {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.1;
          letter-spacing: -0.06em;
          font-weight: 600;
          font-family: "JetBrains Mono", "SFMono-Regular", monospace;
        }

        .project-showcase__comment {
          color: rgba(255, 255, 255, 0.38);
        }

        .project-showcase__typed {
          position: relative;
          display: inline-block;
          min-width: 11ch;
          border-right: 2px solid #a476ff;
          padding-right: 4px;
          animation: project-showcase-caret 0.9s steps(1) infinite;
        }

        @keyframes project-showcase-caret {
          50% { border-color: transparent; }
        }

        .project-showcase__sub {
          margin-top: 18px;
          color: rgba(216, 223, 235, 0.7);
          font-size: 15px;
          line-height: 1.7;
        }

        .project-showcase__tree {
          position: relative;
        }

        .project-showcase__links {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
          z-index: 0;
        }

        .project-showcase__links path {
          fill: none;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke: #a476ff;
          transition: stroke-dashoffset 0.7s cubic-bezier(0.3, 0.7, 0.2, 1) 0.15s;
        }

        .project-showcase__root-row {
          display: flex;
          justify-content: center;
          margin-bottom: 54px;
          position: relative;
          z-index: 2;
        }

        .project-showcase__node {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 18px;
          background: rgba(18, 18, 18, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          font-family: "JetBrains Mono", "SFMono-Regular", monospace;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(-10px) scale(0.94);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .project-showcase__root-node {
          color: #8b9cff;
          box-shadow: 0 18px 35px -24px rgba(120, 139, 255, 0.8);
        }

        .project-showcase__root-node .project-showcase__folder-ico {
          background: rgba(139, 156, 255, 0.22);
        }

        .project-showcase__root-node .project-showcase__folder-ico::before {
          background: rgba(139, 156, 255, 0.38);
        }

        .project-showcase__tree--in .project-showcase__node {
          animation: project-showcase-pop-in 0.5s cubic-bezier(0.2, 0.7, 0.3, 1.2) forwards;
        }

        .project-showcase__tree--in .project-showcase__folder-head .project-showcase__node {
          animation-delay: 0.38s;
        }

        @keyframes project-showcase-pop-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .project-showcase__folder-ico {
          width: 16px;
          height: 13px;
          border-radius: 2px 4px 4px 4px;
          position: relative;
          flex: none;
          display: inline-block;
          background: rgba(164, 118, 255, 0.2);
        }

        .project-showcase__folder-ico::before {
          content: "";
          position: absolute;
          top: -4px;
          left: 0;
          width: 8px;
          height: 4px;
          border-radius: 3px 3px 0 0;
          background: rgba(164, 118, 255, 0.35);
        }

        .project-showcase__branches {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 46px;
          position: relative;
          z-index: 2;
        }

        .project-showcase__col {
          min-width: 0;
        }

        .project-showcase__folder-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          justify-content: center;
        }

        .project-showcase__col[data-col="web"] .project-showcase__node {
          color: #f4c86d;
        }

        .project-showcase__col[data-col="web"] .project-showcase__node .project-showcase__folder-ico {
          background: rgba(244, 200, 109, 0.22);
        }

        .project-showcase__col[data-col="web"] .project-showcase__node .project-showcase__folder-ico::before {
          background: rgba(244, 200, 109, 0.38);
        }

        .project-showcase__col[data-col="other"] .project-showcase__node {
          color: #7ddcc5;
        }

        .project-showcase__col[data-col="other"] .project-showcase__node .project-showcase__folder-ico {
          background: rgba(125, 220, 197, 0.22);
        }

        .project-showcase__col[data-col="other"] .project-showcase__node .project-showcase__folder-ico::before {
          background: rgba(125, 220, 197, 0.38);
        }

        .project-showcase__cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          padding-left: 20px;
        }

        .project-showcase__cards::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 0;
          background: rgba(255, 255, 255, 0.09);
          transition: height 0.5s ease;
        }

        .project-showcase__tree--in .project-showcase__cards::before {
          height: calc(100% - 20px);
          transition-delay: 0.55s;
        }

        .project-showcase__card {
          position: relative;
          background: rgba(18, 18, 18, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 18px 20px 16px;
          opacity: 0;
          transform: translate(-14px, 8px);
          transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.45s ease,
            border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          --accent: #a476ff;
        }

        .project-showcase__tree--in .project-showcase__card {
          animation: project-showcase-card-in 0.55s cubic-bezier(0.16, 0.8, 0.24, 1) forwards;
        }

        .project-showcase__card::before {
          content: "";
          position: absolute;
          left: -20px;
          top: 24px;
          width: 16px;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .project-showcase__tree--in .project-showcase__card::before {
          transform: scaleX(1);
        }

        @keyframes project-showcase-card-in {
          to { opacity: 1; transform: translate(0, 0); }
        }

        .project-showcase__card::after {
          content: "";
          position: absolute;
          left: 0;
          top: 14px;
          bottom: 14px;
          width: 3px;
          border-radius: 3px;
          background: var(--accent);
          opacity: 0.55;
          transition: opacity 0.25s ease, box-shadow 0.25s ease;
        }

        .project-showcase__card:hover {
          transform: translate(0, -3px);
          border-color: color-mix(in srgb, var(--accent) 45%, rgba(255, 255, 255, 0.08));
          box-shadow: 0 10px 28px -14px color-mix(in srgb, var(--accent) 55%, transparent);
          background: rgba(24, 24, 24, 0.96);
        }

        .project-showcase__card:hover::after {
          opacity: 1;
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 70%, transparent);
        }

        .project-showcase__card-head {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 8px;
        }

        .project-showcase__file-ico {
          flex: none;
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: color-mix(in srgb, var(--accent) 22%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
          transition: transform 0.3s ease;
        }

        .project-showcase__card:hover .project-showcase__file-ico {
          transform: rotate(-8deg) scale(1.08);
        }

        .project-showcase__card-title {
          font-family: "JetBrains Mono", "SFMono-Regular", monospace;
          font-weight: 600;
          font-size: 15px;
          color: #eef2ff;
          letter-spacing: 0.01em;
        }

        .project-showcase__card-desc {
          margin: 0 0 14px;
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(216, 223, 235, 0.7);
        }

        .project-showcase__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .project-showcase__tag {
          font-family: "JetBrains Mono", "SFMono-Regular", monospace;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(216, 223, 235, 0.8);
          white-space: nowrap;
        }

        .project-showcase__card:hover .project-showcase__tag {
          border-color: color-mix(in srgb, var(--accent) 25%, rgba(255, 255, 255, 0.08));
        }

        .project-showcase__actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .project-showcase__btn {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: transparent;
          color: rgba(216, 223, 235, 0.8);
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        }

        .project-showcase__btn:hover {
          color: #fff;
          border-color: color-mix(in srgb, var(--accent) 60%, rgba(255, 255, 255, 0.08));
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          transform: translateY(-1px);
        }

        .project-showcase__btn--gh:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 760px) {
          .project-showcase {
            padding-top: 56px;
            padding-bottom: 90px;
          }

          .project-showcase__branches {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .project-showcase__title {
            white-space: normal;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-showcase__typed,
          .project-showcase__node,
          .project-showcase__card,
          .project-showcase__cards::before,
          .project-showcase__card::before {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

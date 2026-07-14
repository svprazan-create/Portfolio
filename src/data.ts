import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Prazan",
    title: "Senior Full-Stack Engineer & UI Architect",
    subtitle: "Crafting exquisite, high-performance web experiences with modern architecture and fluid interactivity.",
    bio: "I am a software engineer specializing in building highly interactive, accessible, and scalable full-stack applications. With a deep passion for clean code, human-centered design, and modern system architectures, I help teams transform complex concepts into seamless, pixel-perfect digital solutions.",
    location: "San Francisco, CA (Open to Remote)",
    email: "svprazan@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    avatarUrl: "/src/assets/images/prazan.jpg"
  },
  skills: [
    // Frontend
    { name: "React / React 19", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 92, category: "Frontend" },
    { name: "Tailwind CSS", level: 98, category: "Frontend" },
    { name: "Next.js & Vite", level: 88, category: "Frontend" },
    { name: "Framer Motion (motion)", level: 90, category: "Frontend" },
    
    // Backend & DB
    { name: "Node.js & Express", level: 86, category: "Backend" },
    { name: "PostgreSQL / SQLite", level: 82, category: "Backend" },
    { name: "GraphQL & RESTful APIs", level: 89, category: "Backend" },
    { name: "Redis Caching", level: 75, category: "Backend" },
    
    // Tools & Engineering
    { name: "Git & GitHub CI/CD", level: 91, category: "Tools & DevOps" },
    { name: "Docker", level: 80, category: "Tools & DevOps" },
    { name: "AWS Cloud Services", level: 78, category: "Tools & DevOps" },
    { name: "UI/UX & Figma", level: 85, category: "Tools & DevOps" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "SaaS Analytics Dashboard",
      description: "A state-of-the-art interactive metrics dashboard featuring real-time data streaming simulation, customized D3/Recharts telemetry visualizations, multi-metric filtering, and full-screen workspace configuration.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
      link: "#",
      github: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj-2",
      title: "Ambient Writing Workspace",
      description: "A minimalist, distraction-free markdown text editor featuring instant syntax previewing, customizable atmospheric theme palettes, local offline history persistence, and integrated relaxing white-noise auditory controls.",
      tags: ["React", "TypeScript", "Tailwind CSS", "WebAudio"],
      link: "#",
      github: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj-3",
      title: "DeFi Assets Ledger Hub",
      description: "An elegant ledger hub for decentralized asset management, displaying reactive currency ticker feeds, multi-wallet balance projections, dynamic transaction categorizations, and detailed profit margin metrics.",
      tags: ["React", "TypeScript", "Tailwind CSS", "REST API"],
      link: "#",
      github: "https://github.com",
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Full-Stack Developer",
      company: "LaunchPad Digital Labs",
      period: "2025 - 2027",
      description: "Shipped 12 bespoke client products spanning e-commerce pipelines, real-time logistics mapping, and financial analytics. Built and managed robust Node.js backend endpoints, optimized PostgreSQL query bottlenecks, and implemented secure local storage state engines."
    },
    {
      id: "exp-2",
      role: "Software Engineer Intern",
      company: "Nebula Cloud Computing",
      period: "2025 - 2026",
      description: "Collaborated in an agile setting to construct modular cloud monitoring tools. Drafted extensive automated tests, enhanced system accessibility tags to conform to WCAG AAA metrics, and optimized custom internal search engine indexing."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Artificial Intelligence & Data Science (AI & DS)",
      school: "Stanford University",
      period: "2024 - 2028",
      description: "Specialized in machine learning algorithms, deep learning neural networks, big data analytics, and statistics. Actively engaged in developing predictive models and data-driven solutions."
    }
  ]
};

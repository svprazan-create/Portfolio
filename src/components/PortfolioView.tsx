import React, { useState, useMemo } from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Send, 
  Check, 
  Code2, 
  Sparkles, 
  Settings, 
  Moon, 
  Sun,
  Server,
  Palette,
  Terminal,
  Layers,
  Award,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioData, ContactMessage } from "../types";
import { ThemePalette, ThemePaletteId, themePalettes } from "../theme";

interface PortfolioViewProps {
  data: PortfolioData;
  onSendMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  onToggleEdit: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeThemeId: ThemePaletteId;
  activeTheme: ThemePalette;
  onChangeTheme: (id: ThemePaletteId) => void;
}

export default function PortfolioView({
  data,
  onSendMessage,
  onToggleEdit,
  isDarkMode,
  onToggleDarkMode,
  activeThemeId,
  activeTheme,
  onChangeTheme,
}: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "experience">("projects");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique categories of skills for display grouping
  const skillCategories = useMemo(() => {
    const categories = new Set(data.skills.map((s) => s.category));
    return Array.from(categories);
  }, [data.skills]);

  // Extract all unique project tags
  const projectTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    data.projects.forEach((proj) => {
      proj.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [data.projects]);

  // Filter projects by tag
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return data.projects;
    return data.projects.filter((proj) => proj.tags.includes(selectedCategory));
  }, [data.projects, selectedCategory]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setErrorMessage("Please fill out Name, Email, and Message fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "48552d31-874c-4753-abb4-5f04dc5c816f",
          name: contactName,
          email: contactEmail,
          subject: contactSubject || "General Inquiry",
          message: contactMessage,
        })
      });

      const result = await response.json();
      if (result.success) {
        onSendMessage({
          name: contactName,
          email: contactEmail,
          subject: contactSubject || "General Inquiry",
          message: contactMessage,
        });
        setIsSent(true);
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      } else {
        setErrorMessage(result.message || "Failed to submit message to Web3Forms.");
      }
    } catch (error) {
      setErrorMessage("Failed to send message. Please check your internet connection.");
      console.error("Web3Forms submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get category icon
  const getCategoryIcon = (category: string) => {
    const c = category.toLowerCase();
    const activeColorClass = isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight;
    if (c.includes("front")) return <Code2 className={`w-5 h-5 ${activeColorClass}`} />;
    if (c.includes("back") || c.includes("database")) return <Server className={`w-5 h-5 ${activeColorClass}`} />;
    if (c.includes("tool") || c.includes("devops") || c.includes("design")) return <Layers className={`w-5 h-5 ${activeColorClass}`} />;
    return <Terminal className={`w-5 h-5 ${activeColorClass}`} />;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? `${activeTheme.bgDark} ${activeTheme.textDark}` : `${activeTheme.bgLight} ${activeTheme.textLight}`}`}>
      
      {/* Absolute Header with action utilities */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? `${activeTheme.headerBgDark} ${activeTheme.borderDark}` : `${activeTheme.headerBgLight} ${activeTheme.borderLight}`}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white bg-gradient-to-tr ${activeTheme.accentGradient}`}>
              {data.profile.name.charAt(0)}
            </div>
            <span className="font-display font-semibold tracking-tight text-lg">{data.profile.name}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className={`hover:transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>About</a>
            <a href="#projects" className={`hover:transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Projects</a>
            <a href="#skills" className={`hover:transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Skills</a>
            <a href="#experience" className={`hover:transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Experience</a>
            <a href="#contact" className={`hover:transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Selector Dots */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              {(Object.keys(themePalettes) as ThemePaletteId[]).map((themeId) => {
                const palette = themePalettes[themeId];
                const isActive = activeThemeId === themeId;
                
                const dotColor = 
                  themeId === "indigo" ? "bg-indigo-500" :
                  themeId === "emerald" ? "bg-emerald-500" :
                  themeId === "amber" ? "bg-amber-500" :
                  "bg-rose-500";

                return (
                  <button
                    key={themeId}
                    onClick={() => onChangeTheme(themeId)}
                    className="relative w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    title={`Switch to ${palette.name} theme`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${dotColor} block shadow-sm`} />
                    {isActive && (
                      <motion.span 
                        layoutId="activeThemeOutline"
                        className={`absolute inset-0 rounded-full border ${isDarkMode ? "border-slate-300" : "border-slate-500"}`}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Toggle Theme */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-all ${isDarkMode ? "bg-slate-800 text-amber-400 hover:bg-slate-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
              title="Toggle Light/Dark Theme"
              id="theme-toggle-btn"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Customize Mode Button */}
            <button
              onClick={onToggleEdit}
              className={`flex items-center gap-2 px-3 py-1.5 ${activeTheme.primaryBtn} text-white font-medium text-sm rounded-lg transition-all shadow-md ${activeTheme.accentShadow}`}
              title="Click to customize portfolio content"
              id="customize-portfolio-btn"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
        {/* Decorative Grid Gradients */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-3xl ${activeThemeId === "emerald" ? "bg-emerald-500" : activeThemeId === "amber" ? "bg-amber-500" : activeThemeId === "rose" ? "bg-rose-500" : "bg-indigo-500"}`} />
          <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl ${activeThemeId === "emerald" ? "bg-teal-500" : activeThemeId === "amber" ? "bg-orange-500" : activeThemeId === "rose" ? "bg-pink-500" : "bg-pink-500"}`} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Column: Avatar & Quick Info */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="relative group">
                <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr ${activeTheme.accentGradient} opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
                <div className={`relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 ${isDarkMode ? "border-slate-950" : "border-white"}`}>
                  <img
                    src={data.profile.avatarUrl || "https://picsum.photos/seed/avatar/300/300"}
                    alt={data.profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = "https://picsum.photos/seed/portfolio-avatar/300/300";
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero copy */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${isDarkMode ? `${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.accentBorder} border` : "bg-slate-100 text-slate-700 border border-slate-200"} mb-4`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight} animate-pulse`} />
                  <span>Available for Projects</span>
                </div>
                
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-4">
                  Hi, I'm <span className={`bg-gradient-to-r ${activeTheme.accentGradientText} bg-clip-text text-transparent`}>{data.profile.name}</span>
                </h1>
                
                <h2 className={`font-display text-xl sm:text-2xl font-medium mb-4 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                  {data.profile.title}
                </h2>
                
                <p className={`text-base sm:text-lg mb-6 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  {data.profile.subtitle}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm font-mono mb-8">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${isDarkMode ? `${activeTheme.borderDark} bg-slate-900/40 text-gray-400` : "border-slate-200 bg-white text-slate-600"}`}>
                    <MapPin className={`w-4 h-4 ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`} />
                    {data.profile.location}
                  </span>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${isDarkMode ? `${activeTheme.borderDark} bg-slate-900/40 text-gray-400` : "border-slate-200 bg-white text-slate-600"}`}>
                    <Mail className={`w-4 h-4 ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`} />
                    {data.profile.email}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <a 
                    href="#projects"
                    className={`px-6 py-3 ${activeTheme.primaryBtn} text-white font-medium rounded-xl transition-all shadow-lg ${activeTheme.accentShadow} text-sm`}
                  >
                    Explore My Work
                  </a>
                  <a 
                    href="#contact"
                    className={`px-6 py-3 font-medium rounded-xl border transition-all text-sm ${isDarkMode ? "border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-gray-200" : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-100 text-slate-700"}`}
                  >
                    Let's Connect
                  </a>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 ml-2">
                    {data.profile.github && (
                      <a 
                        href={data.profile.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`p-2.5 rounded-lg border transition-all ${isDarkMode ? "border-slate-800 hover:border-slate-700 bg-slate-900 text-gray-400 hover:text-white" : "border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900"}`}
                        title="GitHub"
                      >
                        <Github className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {data.profile.linkedin && (
                      <a 
                        href={data.profile.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`p-2.5 rounded-lg border transition-all ${isDarkMode ? "border-slate-800 hover:border-slate-700 bg-slate-900 text-gray-400 hover:text-white" : "border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900"}`}
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {data.profile.twitter && (
                      <a 
                        href={data.profile.twitter} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`p-2.5 rounded-lg border transition-all ${isDarkMode ? "border-slate-800 hover:border-slate-700 bg-slate-900 text-gray-400 hover:text-white" : "border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900"}`}
                        title="Twitter"
                      >
                        <Twitter className="w-4.5 h-4.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
          
          {/* Extended Bio Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-16 p-6 sm:p-8 rounded-2xl border ${isDarkMode ? `bg-slate-900/40 ${activeTheme.borderDark}` : `bg-white ${activeTheme.borderLight} shadow-sm`}`}
          >
            <h3 className="font-display font-bold text-xl mb-3 flex items-center gap-2">
              <Award className={`w-5 h-5 ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`} />
              <span>Professional Summary</span>
            </h3>
            <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
              {data.profile.bio}
            </p>
          </motion.div>

        </div>
      </section>

      {/* Tabs Controller for interactive filter */}
      <div className={`border-y ${isDarkMode ? `${activeTheme.borderDark} bg-[#0F1420]/40` : `${activeTheme.borderLight} bg-white`}`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-1 sm:gap-2 h-14">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "projects" ? `${activeTheme.primaryBtn} text-white shadow-md ${activeTheme.accentShadow}` : `hover:bg-slate-100 dark:hover:bg-slate-800 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}`}
          >
            Featured Projects ({data.projects.length})
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "skills" ? `${activeTheme.primaryBtn} text-white shadow-md ${activeTheme.accentShadow}` : `hover:bg-slate-100 dark:hover:bg-slate-800 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}`}
          >
            Expertise Matrix ({data.skills.length})
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "experience" ? `${activeTheme.primaryBtn} text-white shadow-md ${activeTheme.accentShadow}` : `hover:bg-slate-100 dark:hover:bg-slate-800 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}`}
          >
            Career Timeline ({data.experience.length + data.education.length})
          </button>
        </div>
      </div>

      {/* Main Interactive Tab Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <section id="projects" className="space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl">Featured Projects</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                A curated selection of solutions exploring core full-stack logic, frontend design systems, and visual telemetry.
              </p>
            </div>

            {/* Tags Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {projectTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedCategory(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono border transition-all ${
                    selectedCategory === tag
                      ? isDarkMode 
                        ? `${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.accentBorder}`
                        : "bg-slate-100 text-slate-800 border-slate-300"
                      : isDarkMode
                      ? `bg-slate-900/60 ${activeTheme.borderDark} text-gray-400 hover:border-slate-700 hover:text-white`
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-950"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`group rounded-2xl border overflow-hidden transition-all flex flex-col h-full ${isDarkMode ? "bg-slate-900/30 border-slate-800 hover:bg-slate-900/50 hover:border-slate-700" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}
                    id={`project-card-${project.id}`}
                  >
                    {/* Project Image Panel */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img
                        src={project.imageUrl || "https://picsum.photos/seed/project/400/300"}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://picsum.photos/seed/project-fallback/400/300";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-3">
                          {project.link && (
                            <a 
                              href={project.link}
                              className={`p-2 ${activeTheme.primaryBtn} text-white rounded-lg transition-all`}
                              title="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {project.github && (
                            <a 
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
                              title="GitHub Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className={`font-display font-semibold text-lg tracking-tight group-hover:${activeTheme.accentText} transition-colors`}>
                          {project.title}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-3 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No projects matched this specific category filter.
              </div>
            )}
          </section>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === "skills" && (
          <section id="skills" className="space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl">Expertise Matrix</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                A technical breakdown of core specializations, tools, and platforms calibrated by practical hands-on experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((cat) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
                >
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-800/20 dark:border-slate-800/60">
                    {getCategoryIcon(cat)}
                    <h3 className="font-display font-bold text-lg">{cat}</h3>
                  </div>

                  <div className="space-y-5">
                    {data.skills
                      .filter((s) => s.category === cat)
                      .map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <span className={`font-mono text-xs ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight} font-semibold`}>{skill.level}%</span>
                          </div>
                          
                          {/* Progress bar background */}
                          <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                            {/* Animated core metric */}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full rounded-full bg-gradient-to-r ${activeTheme.accentGradient}`}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: TIMELINE (CAREER & ACADEMIC) */}
        {activeTab === "experience" && (
          <section id="experience" className="space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl">Career & Academic Path</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                Chronological journey detailing architectural responsibilities, professional deliverables, and academic achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Career Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className={`w-5 h-5 ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`} />
                  <h3 className="font-display font-bold text-xl">Work History</h3>
                </div>

                <div className={`relative pl-6 border-l-2 ${isDarkMode ? activeTheme.accentBorder : "border-slate-200"} space-y-8`}>
                  {data.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Node dot */}
                      <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${isDarkMode ? activeTheme.accentBorder + " bg-slate-950" : "border-slate-300 bg-white"} flex items-center justify-center`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? activeTheme.accentText : "bg-slate-400"}`} />
                      </span>

                      <div className="space-y-1.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${isDarkMode ? `${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.accentBorder} border` : "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                          {exp.period}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg">
                          {exp.role}
                        </h4>
                        <h5 className={`text-sm font-semibold ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`}>
                          {exp.company}
                        </h5>
                        <p className={`text-sm leading-relaxed pt-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {data.experience.length === 0 && (
                    <div className="text-gray-500 text-sm">No work experience entries recorded.</div>
                  )}
                </div>
              </div>

              {/* Education Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-pink-500" />
                  <h3 className="font-display font-bold text-xl">Education & Credentials</h3>
                </div>

                <div className={`relative pl-6 border-l-2 ${isDarkMode ? activeTheme.accentBorder : "border-slate-200"} space-y-8`}>
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Node dot */}
                      <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${isDarkMode ? activeTheme.accentBorder + " bg-slate-950" : "border-slate-300 bg-white"} flex items-center justify-center`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? activeTheme.accentText : "bg-slate-400"}`} />
                      </span>

                      <div className="space-y-1.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${isDarkMode ? `${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.accentBorder} border` : "bg-slate-100 text-slate-700 border border-slate-200"}`}>
                          {edu.period}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg">
                          {edu.degree}
                        </h4>
                        <h5 className={`text-sm font-semibold ${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight}`}>
                          {edu.school}
                        </h5>
                        <p className={`text-sm leading-relaxed pt-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {data.education.length === 0 && (
                    <div className="text-gray-500 text-sm">No academic credentials recorded.</div>
                  )}
                </div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* Interactive Contact Form Area */}
      <section id="contact" className={`py-16 sm:py-20 border-t ${isDarkMode ? "bg-slate-900/10 border-slate-800" : "bg-slate-100/50 border-slate-200"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-lg mx-auto space-y-3 mb-10">
            <h2 className="font-display font-bold text-3xl">Get In Touch</h2>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              Have an opening, a proposal, or want to discuss structural architectures? Fire away.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 sm:p-8 rounded-2xl border ${isDarkMode ? "bg-[#0F1420] border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-mono text-gray-400 block font-medium">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-60 ${isDarkMode ? `${activeTheme.accentRing} bg-slate-900 border-slate-800 text-white ${activeTheme.focusBorder}` : `${activeTheme.accentRingLight} bg-slate-50 border-slate-200 text-slate-900 ${activeTheme.focusBorderLight}`}`}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-mono text-gray-400 block font-medium">Your Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@example.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-60 ${isDarkMode ? `${activeTheme.accentRing} bg-slate-900 border-slate-800 text-white ${activeTheme.focusBorder}` : `${activeTheme.accentRingLight} bg-slate-50 border-slate-200 text-slate-900 ${activeTheme.focusBorderLight}`}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-mono text-gray-400 block font-medium">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="Inquiry about software services..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-60 ${isDarkMode ? `${activeTheme.accentRing} bg-slate-900 border-slate-800 text-white ${activeTheme.focusBorder}` : `${activeTheme.accentRingLight} bg-slate-50 border-slate-200 text-slate-900 ${activeTheme.focusBorderLight}`}`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-mono text-gray-400 block font-medium">Detailed Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Hey, let's build something beautiful together..."
                  rows={5}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-60 ${isDarkMode ? `${activeTheme.accentRing} bg-slate-900 border-slate-800 text-white ${activeTheme.focusBorder}` : `${activeTheme.accentRingLight} bg-slate-50 border-slate-200 text-slate-900 ${activeTheme.focusBorderLight}`}`}
                  required
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-xs font-medium font-mono">{errorMessage}</div>
              )}

              <AnimatePresence>
                {isSent && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-emerald-400 text-sm font-medium"
                  >
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Your message has been sent successfully! The details are logged in the dynamic builder control panel and forwarded to svprazan@gmail.com.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${activeTheme.accentGradient} hover:opacity-90 disabled:opacity-50 text-white font-medium rounded-xl transition-all shadow-lg ${activeTheme.accentShadow} text-sm cursor-pointer disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Humble Footer */}
      <footer className={`py-12 border-t ${isDarkMode ? "bg-[#0B0F17] border-slate-800 text-gray-500" : "bg-white border-slate-200 text-slate-400"}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {data.profile.name}. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-mono">
            <span>Powered by React 19 + Tailwind CSS</span>
            <span>&bull;</span>
            <button 
              onClick={onToggleEdit}
              className={`${isDarkMode ? activeTheme.accentText : activeTheme.accentTextLight} hover:underline flex items-center gap-1`}
            >
              Configure Template
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

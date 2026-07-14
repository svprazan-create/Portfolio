import React, { useState, useEffect } from "react";
import { initialPortfolioData } from "./data";
import { PortfolioData, ContactMessage } from "./types";
import PortfolioView from "./components/PortfolioView";
import PortfolioEditor from "./components/PortfolioEditor";
import { ThemePaletteId, themePalettes } from "./theme";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageSquare, Code, Settings, X, Eye } from "lucide-react";

export default function App() {
  // 1. Theme Palette state (indigo, emerald, amber, rose)
  const [activeThemeId, setActiveThemeId] = useState<ThemePaletteId>(() => {
    const saved = localStorage.getItem("portfolio_theme_palette");
    return (saved as ThemePaletteId) || "indigo";
  });

  const activeTheme = themePalettes[activeThemeId] || themePalettes.indigo;

  const handleThemeChange = (themeId: ThemePaletteId) => {
    setActiveThemeId(themeId);
    localStorage.setItem("portfolio_theme_palette", themeId);
  };

  // 2. Theme state: Default to dark theme for premium developer feel
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("portfolio_dark_mode");
    return saved !== null ? saved === "true" : true;
  });

  // Apply dark class to body/html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio_dark_mode", String(isDarkMode));
  }, [isDarkMode]);

  // 2. Portfolio data state
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem("portfolio_blueprint_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate default name from Alex Carter to Prazan
        let migrated = false;
        if (parsed.profile && parsed.profile.name === "Alex Carter") {
          parsed.profile.name = initialPortfolioData.profile.name;
          parsed.profile.email = initialPortfolioData.profile.email;
          migrated = true;
        }
        if (parsed.profile && (parsed.profile.avatarUrl === "/src/assets/images/portfolio_avatar_1783344470615.jpg" || parsed.profile.avatarUrl === "/src/assets/images/portfolio_avatar_1783598720698.jpg" || !parsed.profile.avatarUrl)) {
          parsed.profile.avatarUrl = initialPortfolioData.profile.avatarUrl;
          migrated = true;
        }
        if (parsed.education && parsed.education.length > 0 && 
            (parsed.education[0].degree.includes("Human-Computer Interaction") || parsed.education[0].period === "2018 - 2022")) {
          parsed.education[0].degree = initialPortfolioData.education[0].degree;
          parsed.education[0].period = initialPortfolioData.education[0].period;
          parsed.education[0].description = initialPortfolioData.education[0].description;
          migrated = true;
        }
        if (parsed.experience && (parsed.experience.length !== 2 || parsed.experience[0]?.period !== "2025 - 2027" || parsed.experience[1]?.period !== "2025 - 2026")) {
          parsed.experience = initialPortfolioData.experience;
          migrated = true;
        }
        if (migrated) {
          localStorage.setItem("portfolio_blueprint_data", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved blueprint data, using default", e);
      }
    }
    return initialPortfolioData;
  });

  // Save portfolio data updates
  const handleDataChange = (updated: PortfolioData) => {
    setPortfolioData(updated);
    localStorage.setItem("portfolio_blueprint_data", JSON.stringify(updated));
  };

  // 3. Sent messages state
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("portfolio_inbox_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved inbox messages", e);
      }
    }
    return [];
  });

  const handleSendMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("portfolio_inbox_messages", JSON.stringify(updated));
  };

  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_inbox_messages");
  };

  // Reset profile data to Alex Carter defaults
  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all portfolio customization back to the default profile?")) {
      setPortfolioData(initialPortfolioData);
      localStorage.setItem("portfolio_blueprint_data", JSON.stringify(initialPortfolioData));
    }
  };

  // 4. Panel visibility state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? activeTheme.bgDark : activeTheme.bgLight}`}>
      
      {/* Dynamic Main Workspace Container */}
      <div className="flex h-screen overflow-hidden relative">
        
        {/* Left Side: Portfolio View Area */}
        <div className="flex-1 overflow-y-auto h-full scroll-smooth">
          <PortfolioView
            data={portfolioData}
            onSendMessage={handleSendMessage}
            onToggleEdit={() => setIsEditorOpen(prev => !prev)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
            activeThemeId={activeThemeId}
            activeTheme={activeTheme}
            onChangeTheme={handleThemeChange}
          />
        </div>

        {/* Right Side: Builder Control Panel */}
        {/* Desktop Split-Screen Panel & Mobile Overlay Drawer via AnimatePresence */}
        <AnimatePresence mode="wait">
          {isEditorOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="absolute lg:relative top-0 right-0 h-full w-full sm:w-[480px] lg:w-[460px] xl:w-[500px] z-50 flex-shrink-0"
            >
              <PortfolioEditor
                data={portfolioData}
                onChangeData={handleDataChange}
                messages={messages}
                onClearMessages={handleClearMessages}
                onResetToDefault={handleResetToDefault}
                onClose={() => setIsEditorOpen(false)}
                activeThemeId={activeThemeId}
                activeTheme={activeTheme}
                onChangeTheme={handleThemeChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Floater Hint Helper (only shown if Editor is closed, prompting user they can customize) */}
      <AnimatePresence>
        {!isEditorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-40 hidden sm:block pointer-events-none"
          >
            <div className={`p-4 ${isDarkMode ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200/80"} border rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm pointer-events-auto`}>
              <div className={`p-2 ${activeTheme.primaryBtn} rounded-lg text-white`}>
                <Settings className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="text-left flex-1">
                <p className={`text-xs font-bold font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>Personalize this portfolio!</p>
                <p className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Click the <strong className={isDarkMode ? activeTheme.accentText : "text-slate-800"}>Customize</strong> button in the header to modify profile bio, skills, and projects in real-time.</p>
              </div>
              <button
                onClick={() => setIsEditorOpen(true)}
                className={`p-1 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}
                title="Open Editor"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

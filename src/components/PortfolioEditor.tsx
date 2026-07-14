import React, { useState } from "react";
import { 
  User, 
  Layers, 
  FolderGit2, 
  Calendar, 
  Mail, 
  Code2, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  Check, 
  Inbox,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info
} from "lucide-react";
import { PortfolioData, Skill, Project, Experience, Education, ContactMessage } from "../types";
import { ThemePalette, ThemePaletteId } from "../theme";

interface PortfolioEditorProps {
  data: PortfolioData;
  onChangeData: (updated: PortfolioData) => void;
  messages: ContactMessage[];
  onClearMessages: () => void;
  onResetToDefault: () => void;
  onClose: () => void;
  activeThemeId: ThemePaletteId;
  activeTheme: ThemePalette;
  onChangeTheme: (id: ThemePaletteId) => void;
}

type EditorTab = "profile" | "skills" | "projects" | "history" | "inbox" | "config";

export default function PortfolioEditor({
  data,
  onChangeData,
  messages,
  onClearMessages,
  onResetToDefault,
  onClose,
  activeThemeId,
  activeTheme,
  onChangeTheme
}: PortfolioEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>("profile");
  
  // Quick profile edits
  const handleProfileChange = (key: keyof PortfolioData["profile"], value: string) => {
    onChangeData({
      ...data,
      profile: {
        ...data.profile,
        [key]: value
      }
    });
  };

  // Skill edits
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      category: newSkillCategory.trim()
    };
    onChangeData({
      ...data,
      skills: [...data.skills, newSkill]
    });
    setNewSkillName("");
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = [...data.skills];
    updatedSkills.splice(index, 1);
    onChangeData({
      ...data,
      skills: updatedSkills
    });
  };

  const handleSkillLevelChange = (index: number, val: number) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index].level = val;
    onChangeData({
      ...data,
      skills: updatedSkills
    });
  };

  // Project edits
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjTags, setNewProjTags] = useState("");
  const [newProjUrl, setNewProjUrl] = useState("");
  const [newProjGithub, setNewProjGithub] = useState("");
  const [newProjImage, setNewProjImage] = useState("");

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;
    const tagsArr = newProjTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim(),
      tags: tagsArr.length > 0 ? tagsArr : ["React"],
      link: newProjUrl.trim() || undefined,
      github: newProjGithub.trim() || undefined,
      imageUrl: newProjImage.trim() || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    };
    
    onChangeData({
      ...data,
      projects: [newProject, ...data.projects]
    });

    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjTags("");
    setNewProjUrl("");
    setNewProjGithub("");
    setNewProjImage("");
  };

  const handleDeleteProject = (id: string) => {
    onChangeData({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Experience & Education
  const [newExpRole, setNewExpRole] = useState("");
  const [newExpCompany, setNewExpCompany] = useState("");
  const [newExpPeriod, setNewExpPeriod] = useState("");
  const [newExpDesc, setNewExpDesc] = useState("");

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpRole.trim() || !newExpCompany.trim()) return;
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: newExpRole.trim(),
      company: newExpCompany.trim(),
      period: newExpPeriod.trim() || "2024 - Present",
      description: newExpDesc.trim()
    };
    onChangeData({
      ...data,
      experience: [newExp, ...data.experience]
    });
    setNewExpRole("");
    setNewExpCompany("");
    setNewExpPeriod("");
    setNewExpDesc("");
  };

  const handleDeleteExperience = (id: string) => {
    onChangeData({
      ...data,
      experience: data.experience.filter(e => e.id !== id)
    });
  };

  const [newEduDegree, setNewEduDegree] = useState("");
  const [newEduSchool, setNewEduSchool] = useState("");
  const [newEduPeriod, setNewEduPeriod] = useState("");
  const [newEduDesc, setNewEduDesc] = useState("");

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduDegree.trim() || !newEduSchool.trim()) return;
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: newEduDegree.trim(),
      school: newEduSchool.trim(),
      period: newEduPeriod.trim() || "2018 - 2022",
      description: newEduDesc.trim()
    };
    onChangeData({
      ...data,
      education: [newEdu, ...data.education]
    });
    setNewEduDegree("");
    setNewEduSchool("");
    setNewEduPeriod("");
    setNewEduDesc("");
  };

  const handleDeleteEducation = (id: string) => {
    onChangeData({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  // JSON Import & Export
  const [jsonString, setJsonString] = useState("");
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExportJSON = () => {
    const exported = JSON.stringify(data, null, 2);
    setJsonString(exported);
    navigator.clipboard.writeText(exported);
    alert("Portfolio configuration copied to clipboard as JSON!");
  };

  const handleImportJSON = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.profile || !parsed.skills || !parsed.projects || !parsed.experience || !parsed.education) {
        setImportError("Invalid portfolio schema. Please check requirements.");
        return;
      }
      onChangeData(parsed);
      setImportError("");
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (err) {
      setImportError("Could not parse JSON. Check formatting or syntax.");
    }
  };

  return (
    <div className="bg-[#0F172A] border-l border-slate-800 text-slate-100 h-full flex flex-col shadow-2xl">
      
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0B0F17]">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded ${activeTheme.accentBg} ${activeTheme.accentText}`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base">Builder Console</h2>
            <p className="text-[10px] text-slate-400 font-mono">Live Portfolio Customizer</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition-all"
        >
          View Live Site
        </button>
      </div>

      {/* Drawer Nav Bar */}
      <div className="flex border-b border-slate-800 bg-[#0F172A] text-xs font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all ${activeTab === "profile" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all ${activeTab === "skills" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <Code2 className="w-4 h-4" />
          <span>Skills</span>
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all ${activeTab === "projects" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all ${activeTab === "history" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Timeline</span>
        </button>
        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 relative transition-all ${activeTab === "inbox" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <Inbox className="w-4 h-4" />
          <span>Inbox</span>
          {messages.length > 0 && (
            <span className="absolute top-2 right-1 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all ${activeTab === "config" ? `${activeTheme.accentBorder} ${activeTheme.accentText} bg-slate-900/30` : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/20"}`}
        >
          <Download className="w-4 h-4" />
          <span>Export/Reset</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">

        {/* TAB: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider mb-2">Profile Identity</h3>
            
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">Your Full Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-medium">Professional Title</label>
                <input
                  type="text"
                  value={data.profile.title}
                  onChange={(e) => handleProfileChange("title", e.target.value)}
                  className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-medium">Sub-heading Intro</label>
                <input
                  type="text"
                  value={data.profile.subtitle}
                  onChange={(e) => handleProfileChange("subtitle", e.target.value)}
                  className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-medium">Detailed Bio / Summary</label>
                <textarea
                  value={data.profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  rows={4}
                  className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 block font-medium">Avatar Image URL (or path)</label>
                <input
                  type="text"
                  value={data.profile.avatarUrl}
                  onChange={(e) => handleProfileChange("avatarUrl", e.target.value)}
                  className={`w-full bg-slate-900 border border-slate-800 ${activeTheme.accentText} font-mono text-[10px] rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">Public Email</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">GitHub Profile Link</label>
                  <input
                    type="text"
                    value={data.profile.github}
                    onChange={(e) => handleProfileChange("github", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">LinkedIn URL</label>
                  <input
                    type="text"
                    value={data.profile.linkedin}
                    onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 block font-medium">Twitter / X URL</label>
                  <input
                    type="text"
                    value={data.profile.twitter}
                    onChange={(e) => handleProfileChange("twitter", e.target.value)}
                    className={`w-full bg-slate-900 border border-slate-800 text-white rounded px-3 py-2 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            
            {/* Form to add a skill */}
            <form onSubmit={handleAddSkill} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3.5">
              <h4 className={`text-xs font-semibold ${activeTheme.accentText} font-mono uppercase tracking-wider`}>Add New Skill</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">Skill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Docker, Rust"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Category Group</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools & DevOps">Tools & DevOps</option>
                    <option value="Creative Design">Creative Design</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <label className="text-slate-400">Expertise Level: <span className={`${activeTheme.accentText} font-mono`}>{newSkillLevel}%</span></label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  style={{ accentColor: activeTheme.accentColorHex }}
                  className="w-full h-1.5 rounded-lg bg-slate-950 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-1.5 ${activeTheme.primaryBtn} text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Append Skill</span>
              </button>
            </form>

            {/* List current skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Manage Skills ({data.skills.length})</h4>
              
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {data.skills.map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800/80 rounded-lg text-xs">
                    <div className="flex-1 mr-3 space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span className="font-semibold">{skill.name}</span>
                        <span className={`${activeTheme.accentText} font-mono`}>{skill.level}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[9px] text-slate-400 border border-slate-800">{skill.category}</span>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={skill.level}
                          onChange={(e) => handleSkillLevelChange(index, Number(e.target.value))}
                          style={{ accentColor: activeTheme.accentColorHex }}
                          className="w-20 h-1 bg-slate-950 rounded"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(index)}
                      className="p-1.5 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-md transition-all"
                      title="Delete skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            
            {/* Form to add a project */}
            <form onSubmit={handleAddProject} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
              <h4 className={`text-xs font-semibold ${activeTheme.accentText} font-mono uppercase tracking-wider`}>Add New Project</h4>

              <div className="space-y-1">
                <label className="text-slate-400">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Neural Link Engine"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Brief Description</label>
                <textarea
                  placeholder="Summarize key features, architectures, and objectives..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  rows={2}
                  className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Tech Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, AWS, D3"
                  value={newProjTags}
                  onChange={(e) => setNewProjTags(e.target.value)}
                  className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://"
                    value={newProjUrl}
                    onChange={(e) => setNewProjUrl(e.target.value)}
                    className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Github Repository</label>
                  <input
                    type="text"
                    placeholder="https://"
                    value={newProjGithub}
                    onChange={(e) => setNewProjGithub(e.target.value)}
                    className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Thumbnail Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProjImage}
                  onChange={(e) => setNewProjImage(e.target.value)}
                  className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 ${activeTheme.primaryBtn} text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Project Card</span>
              </button>
            </form>

            {/* List existing projects */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Manage Projects ({data.projects.length})</h4>
              
              <div className="space-y-2">
                {data.projects.map((project) => (
                  <div key={project.id} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-start gap-3 text-xs">
                    <img
                      src={project.imageUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover bg-slate-950 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-200 truncate">{project.title}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{project.description}</p>
                      <div className="flex items-center gap-1.5 pt-1.5 flex-wrap">
                        {project.tags.map((t) => (
                          <span key={t} className={`px-1 py-0.5 rounded bg-slate-950 text-[8px] ${activeTheme.accentText} border border-slate-800`}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded transition-all"
                      title="Remove Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: TIMELINE (CAREER & EDUCATION) */}
        {activeTab === "history" && (
          <div className="space-y-8">
            
            {/* WORK EXPERIENCE */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3 text-xs">
                <h4 className={`text-xs font-semibold ${activeTheme.accentText} font-mono uppercase tracking-wider`}>Add Career History</h4>
                
                <form onSubmit={handleAddExperience} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-slate-400">Role / Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Technical Director"
                        value={newExpRole}
                        onChange={(e) => setNewExpRole(e.target.value)}
                        className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">Company / Studio</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={newExpCompany}
                        onChange={(e) => setNewExpCompany(e.target.value)}
                        className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Duration Period</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024 - Present"
                      value={newExpPeriod}
                      onChange={(e) => setNewExpPeriod(e.target.value)}
                      className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Primary Responsibilities</label>
                    <textarea
                      placeholder="Discuss deliverables, performance increases, and tech architectures..."
                      value={newExpDesc}
                      onChange={(e) => setNewExpDesc(e.target.value)}
                      rows={2}
                      className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-1.5 ${activeTheme.primaryBtn} text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Append Experience</span>
                  </button>
                </form>
              </div>

              {/* Work list */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Active Experience Timeline</h5>
                {data.experience.map(exp => (
                  <div key={exp.id} className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg text-xs flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-200">{exp.role}</p>
                      <p className={`${activeTheme.accentText} text-[10px]`}>{exp.company} &bull; {exp.period}</p>
                      <p className="text-slate-400 text-[10px] line-clamp-1 mt-1">{exp.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-1.5 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded flex-shrink-0 transition-all self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3 text-xs">
                <h4 className="text-xs font-semibold text-pink-400 font-mono uppercase tracking-wider">Add Academic Credentials</h4>
                
                <form onSubmit={handleAddEducation} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-slate-400">Degree / Certificate</label>
                      <input
                        type="text"
                        placeholder="e.g. M.S. Software Engineering"
                        value={newEduDegree}
                        onChange={(e) => setNewEduDegree(e.target.value)}
                        className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400">School / Academy</label>
                      <input
                        type="text"
                        placeholder="e.g. MIT"
                        value={newEduSchool}
                        onChange={(e) => setNewEduSchool(e.target.value)}
                        className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Attendance Period</label>
                    <input
                      type="text"
                      placeholder="e.g. 2018 - 2022"
                      value={newEduPeriod}
                      onChange={(e) => setNewEduPeriod(e.target.value)}
                      className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Additional details</label>
                    <textarea
                      placeholder="Honors, key researchers, specialized coursework..."
                      value={newEduDesc}
                      onChange={(e) => setNewEduDesc(e.target.value)}
                      rows={2}
                      className={`w-full bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1.5 focus:outline-none ${activeTheme.focusBorder}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Append Education</span>
                  </button>
                </form>
              </div>

              {/* Education list */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Active Academic History</h5>
                {data.education.map(edu => (
                  <div key={edu.id} className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg text-xs flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-200">{edu.degree}</p>
                      <p className="text-pink-400 text-[10px]">{edu.school} &bull; {edu.period}</p>
                      <p className="text-slate-400 text-[10px] line-clamp-1 mt-1">{edu.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-1.5 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded flex-shrink-0 transition-all self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: INBOX */}
        {activeTab === "inbox" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider">Form Submissions ({messages.length})</h3>
              {messages.length > 0 && (
                <button
                  onClick={onClearMessages}
                  className="text-[10px] font-mono text-pink-400 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3.5">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-200 text-sm">{msg.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{msg.email}</p>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{msg.date}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/50 space-y-1">
                    <p className={`font-semibold ${activeTheme.accentText}`}>Subject: <span className="text-slate-300">{msg.subject}</span></p>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap pt-1">{msg.message}</p>
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl p-6 text-slate-500 space-y-2">
                  <Mail className="w-8 h-8 text-slate-700 mx-auto" />
                  <p className="text-xs font-semibold">Inbox is Empty</p>
                  <p className="text-[11px] text-slate-600">Submit the contact form on the live preview page, and the structural details will log here immediately!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: EXPORT / CONFIG */}
        {activeTab === "config" && (
          <div className="space-y-5">
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-xs space-y-3">
              <h3 className="font-semibold text-slate-300 flex items-center gap-2">
                <Info className={`w-4 h-4 ${activeTheme.accentText}`} />
                <span>Template Settings</span>
              </h3>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                You can save your customized portfolio as a JSON object, restore it at any time, or reset back to the default profile.
              </p>

              <button
                onClick={onResetToDefault}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Default Profile</span>
              </button>
            </div>

            <form onSubmit={handleImportJSON} className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">JSON Blueprint Configuration</h4>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className={`${activeTheme.accentText} hover:underline flex items-center gap-1 text-[11px]`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy Blueprint</span>
                </button>
              </div>

              <textarea
                value={jsonString}
                onChange={(e) => setJsonString(e.target.value)}
                placeholder="Paste customized JSON template block here..."
                rows={10}
                className={`w-full bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[10px] rounded p-3 focus:outline-none focus:ring-0 leading-relaxed ${activeTheme.focusBorder}`}
              />

              {importError && (
                <p className="text-red-400 text-xs font-mono font-semibold">{importError}</p>
              )}

              {importSuccess && (
                <p className="text-emerald-400 text-xs font-mono font-semibold">Blueprint loaded successfully!</p>
              )}

              <button
                type="submit"
                className={`w-full py-2 ${activeTheme.primaryBtn} text-white font-medium rounded-lg transition-all flex items-center justify-center gap-1.5`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Load Paste Blueprint</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Footer copyright */}
      <div className="p-4 bg-[#0B0F17] border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
        Portfolio Builder &bull; React Client SPA
      </div>

    </div>
  );
}

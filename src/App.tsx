import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Menu, X, User, Code, Briefcase, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Développeur Full Stack';

  // Animation de frappe pour le titre
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Gestion du scroll pour la navigation active
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Plateforme de commerce électronique complète avec React, Node.js et MongoDB",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "Application de gestion de tâches avec authentification et temps réel",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["Vue.js", "Firebase", "Vuetify"],
      github: "#",
      demo: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Tableau de bord météo avec géolocalisation et prévisions détaillées",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500",
      technologies: ["JavaScript", "API REST", "Chart.js"],
      github: "#",
      demo: "#"
    }
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "CSS/SCSS", level: 88 },
    { name: "MongoDB", level: 70 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">Portfolio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Accueil', icon: User },
                { id: 'about', label: 'À propos', icon: User },
                { id: 'skills', label: 'Compétences', icon: Code },
                { id: 'projects', label: 'Projets', icon: Briefcase },
                { id: 'contact', label: 'Contact', icon: MessageCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === id
                      ? 'text-blue-400 bg-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-2 space-y-1">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'about', label: 'À propos' },
                { id: 'skills', label: 'Compétences' },
                { id: 'projects', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Section Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <User size={60} className="text-gray-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Bonjour, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Alex</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-400 mb-8 h-12 flex items-center justify-center">
              {displayText}<span className="animate-pulse">|</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Passionné par la création d'expériences numériques exceptionnelles et de solutions web innovantes.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Github size={30} />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Linkedin size={30} />
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              <Mail size={30} />
            </a>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="mt-16 animate-bounce text-white hover:text-blue-400 transition-colors"
          >
            <ChevronDown size={40} />
          </button>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">À propos de moi</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Développeur full-stack passionné avec plus de 3 ans d'expérience dans la création 
                d'applications web modernes. J'aime transformer des idées complexes en solutions 
                élégantes et fonctionnelles.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Spécialisé dans les technologies JavaScript modernes, je crée des expériences 
                utilisateur exceptionnelles en combinant design créatif et code robuste.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'AWS'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-blue-400 border border-blue-400/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <Code size={120} className="text-blue-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section id="skills" className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Compétences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-blue-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Mes Projets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Contactez-moi</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Travaillons ensemble</h3>
                <p className="text-gray-300 text-lg">
                  Je suis toujours intéressé par de nouveaux projets et opportunités. 
                  N'hésitez pas à me contacter si vous souhaitez discuter d'une collaboration.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-blue-400" size={24} />
                  <span className="text-white">alex@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="text-blue-400" size={24} />
                  <span className="text-white">github.com/alexdev</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="text-blue-400" size={24} />
                  <span className="text-white">linkedin.com/in/alexdev</span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Alex Portfolio. Créé avec passion ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
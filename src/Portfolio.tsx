import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Moon, Sun, X } from "lucide-react";
import { Button } from "./components/ui/button";
import solsticeImage from "./assets/tech-solstice.jpg";
const solsticeAsset = { url: solsticeImage };
import hackverseImage from "./assets/hackverse.jpg";
import profileImage from "./assets/profile.jpg";
const hackverseAsset = { url: hackverseImage };


const certificates = [
  { title: "Tech Solstice ’26", issuer: "Manipal Institute of Technology, Bengaluru", description: "Technical & Innovation Fest · March 2026", image: solsticeAsset.url },
  { title: "HackVerse 2.0", issuer: "MIT Bengaluru · IBM · Celonis · 1M1B", description: "Hackathon · Certificate of participation", image: hackverseAsset.url },
];

function SectionTitle({ number, title, children }: { number: string; title: string; children?: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-baseline"><span className="section-num">{number}</span><h2 className="section-heading">{title}</h2></div>{children}</div>;
}

export function Index() {
  const [dark, setDark] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const isDark = localStorage.getItem("sen-portfolio-theme-v2") !== "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = reducedMotion.matches ? 0 : Math.min(Math.max(window.scrollY, 0), hero.offsetHeight);
      hero.style.setProperty("--depth-shift", `${offset}px`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCertificate !== null && dialog && !dialog.open) dialog.showModal();
  }, [selectedCertificate]);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sen-portfolio-theme-v2", next ? "dark" : "light");
  };
  const closeCertificate = () => { dialogRef.current?.close(); setSelectedCertificate(null); };
  return <div className="portfolio">
    <header className="page-width flex h-24 items-center justify-between border-b border-border">
      <a href="#home" aria-label="Abhimanyu Sen, home" className="flex items-center gap-4"><div className="brand-mark"><span>a</span></div><span className="eyebrow hidden sm:inline">Abhimanyu Sen</span></a>
      <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
        <a className="nav-link" href="#work">Work</a><a className="nav-link" href="#about">About</a><a className="nav-link" href="#certificates">Certificates</a>
        <span className="h-4 border-l border-border" />
        <Button variant="quiet" size="icon" onClick={toggleTheme} title={dark ? "Switch to light mode" : "Switch to dark mode"} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</Button>
      </nav>
    </header>
    <main id="home" className="page-width">
      <section ref={heroRef} className="hero" aria-labelledby="name">
        <div className="hero-portrait fade-in delay-zero"><img src={profileImage} width={1599} height={1599} alt="Abhimanyu Sen" /></div>
        <div className="hero-text">
          <h1 id="name" className="hero-title fade-in delay-one">Abhimanyu <em>Sen.</em></h1>
          <p className="hero-copy mt-6 fade-in delay-two">Programming, Linux, and cybersecurity.</p>
          <div className="mt-7 fade-in delay-three"><Button variant="portfolio" asChild><a href="https://github.com/sen-qui" target="_blank" rel="noopener noreferrer"><Github /> GitHub <ArrowUpRight /></a></Button></div>
          <a href="#work" className="hero-foot fade-in delay-three">PROJECTS <ArrowDown size={13} /></a>
        </div>
      </section>

      <section id="work" className="section">
        <SectionTitle number="01" title="Projects"><a href="https://github.com/sen-qui" target="_blank" rel="noopener noreferrer" className="nav-link flex items-center gap-2">All repositories <ArrowUpRight size={14} /></a></SectionTitle>
        <article className="project-card">
          <div className="project-body">
            <h3 className="font-display text-4xl font-medium mb-3">AltCred</h3>
            <p className="body-copy">Alternative credit scoring using transaction data, with AI-assisted financial insights.</p>
            <div className="flex flex-wrap gap-2 mt-5"><span className="tag">Python</span><span className="tag">JavaScript</span><span className="tag">Financial analysis</span></div>
            <Button variant="quiet" className="mt-7 px-0" asChild><a href="https://github.com/sen-qui/AltCred" target="_blank" rel="noopener noreferrer">View on GitHub <ArrowUpRight /></a></Button>
          </div>
        </article>
        <p className="text-xs text-muted-foreground mt-4">Built for IBM HackVerse.</p>
      </section>

      <section id="about" className="section">
        <div className="about-grid"><SectionTitle number="02" title="About me" />
          <p className="body-copy">I write code, configure Linux systems, and run language models locally. My interests include cybersecurity and cryptography.</p></div>
        <div className="skill-grid">
          <div className="skill-column"><h3>Languages</h3><p>Python · Java · JavaScript<br />HTML<br />CSS · Tailwind & vanilla</p></div>
          <div className="skill-column"><h3>Systems & AI</h3><p>Arch Linux · Debian · Mint<br />Hyprland · Waybar · SDDM<br />Linux administration · WSL<br />Local LLMs</p></div>
          <div className="skill-column"><h3>Security</h3><p>Cryptography<br />Steganography<br />Capture-the-flag challenges</p></div>
        </div>
      </section>

      <section id="certificates" className="section">
        <SectionTitle number="03" title="Certificates" />
        <div className="certificate-grid">{certificates.map((certificate, index) => <article className="certificate-card" key={certificate.title}>
          <img src={certificate.image} width={1080} height={768} loading="lazy" className="certificate-image" alt={`${certificate.title} participation certificate awarded to Abhimanyu Sen`} />
          <div className="p-6"><span className="eyebrow text-muted-foreground">Participation</span><h3 className="font-display text-2xl font-semibold mt-2">{certificate.title}</h3><p className="text-xs text-muted-foreground leading-relaxed mt-2">{certificate.issuer}</p><p className="text-xs text-muted-foreground mt-1">{certificate.description}</p><Button variant="quiet" className="mt-4 px-0" onClick={() => setSelectedCertificate(index)}>View certificate <ArrowUpRight /></Button></div>
        </article>)}</div>
        <div className="mt-10">
          <div className="achievement"><div><h3 className="text-sm font-medium">Tech Solstice CTF</h3><span className="text-xs text-muted-foreground">Lead team contributor</span></div><p className="body-copy">Scored 1,800 of the team’s 2,300 points.</p><span className="eyebrow text-muted-foreground">2026</span></div>
          <div className="achievement"><div><h3 className="text-sm font-medium">IBM HackVerse</h3><span className="text-xs text-muted-foreground">AltCred · Project contributor</span></div><p className="body-copy">Worked on AltCred’s credit scoring and financial insights.</p></div>
        </div>
      </section>

      <section className="contact border-t border-border"><h2>Contact</h2><Button variant="portfolio" asChild className="mt-6"><a href="https://github.com/sen-qui" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight /></a></Button></section>
    </main>
    <footer className="page-width border-t border-border flex flex-wrap items-center justify-between gap-4 py-7 text-[10px] text-muted-foreground"><span>© {new Date().getFullYear()} Abhimanyu Sen</span><a href="#home" className="flex items-center gap-2">Back to top <ArrowUpRight size={12} /></a></footer>
    <dialog ref={dialogRef} className="certificate-dialog" onCancel={() => setSelectedCertificate(null)} onClose={() => setSelectedCertificate(null)} onClick={(event) => { if (event.target === event.currentTarget) closeCertificate(); }}>
      {selectedCertificate !== null && <><div className="flex items-center justify-between gap-4 mb-4"><h2 className="font-display text-2xl">{certificates[selectedCertificate]?.title}</h2><Button variant="quiet" size="icon" aria-label="Close certificate" onClick={closeCertificate}><X /></Button></div><img src={certificates[selectedCertificate]?.image} alt={`${certificates[selectedCertificate]?.title} certificate for Abhimanyu Sen`} /><div className="flex justify-end mt-4"><Button variant="portfolio" asChild><a href={certificates[selectedCertificate]?.image} target="_blank" rel="noopener noreferrer">Open original <ArrowUpRight /></a></Button></div></>}
    </dialog>
  </div>;
}

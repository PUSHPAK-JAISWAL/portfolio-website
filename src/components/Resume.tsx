import { Download, FileText } from "lucide-react";

const Resume = () => {
  const handleDownload = () => {
    const a = document.createElement("a");
    // Dynamically prefixes your Vite base path (e.g., "/portfolio-website/resume.pdf")
    a.href = `${import.meta.env.BASE_URL}resume.pdf`;
    a.download = "Pushpak_Jaiswal_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="animate-fade-in space-y-4">
      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[08]</span> ~/resume.pdf</span>
          <span>application/pdf</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          <span className="text-gruv-aqua">pushpak@arch</span> ~ $ <span className="text-foreground">file resume.pdf &amp;&amp; ls -lh resume.pdf</span>
        </div>
      </div>

      <div className="pane">
        <div className="pane-title">
          <span><span className="id">[$]</span> download.sh</span>
          <span>executable</span>
        </div>
        <div className="p-6 flex flex-col items-center gap-4 text-center">
          <FileText className="w-12 h-12 text-primary" />
          <div className="text-sm text-muted-foreground max-w-md">
            One pager: experience, education, stack and projects — all the things hiring filters look for.
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 hover:bg-accent transition-colors font-bold"
          >
            <Download className="w-4 h-4" /> ./download_resume.sh
          </button>
          <div className="text-[10px] text-muted-foreground">
            file: <span className="text-gruv-aqua">public/resume.pdf</span> · sha: <span className="text-gruv-yellow">a1b2c3d</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

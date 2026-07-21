import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const YOUTUBE_DEMO_URL = "https://www.youtube.com/watch?v=M7lc1UVf-VE";

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  );
  return match && match[2].length === 11 ? match[2] : null;
}

interface AboutVideoProps {
  youtubeUrl?: string;
}

const AboutVideo = ({ youtubeUrl = YOUTUBE_DEMO_URL }: AboutVideoProps) => {
  const { t } = useLanguage();
  const videoId = getYouTubeEmbedId(youtubeUrl);

  return (
    <div className="text-center">
      <span className="text-xs tracking-[4px] uppercase text-primary mb-3 block">
        {t("about.video.label")}
      </span>
      <h2 className="font-heading-cn text-2xl sm:text-3xl text-foreground mb-2">
        {t("about.video.title")}
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-8">
        {t("about.video.desc")}
      </p>

      <div className="card-glass rounded-2xl p-1 md:p-2 border border-primary/20 glow-box-hover transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={t("about.video.title")}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3 animate-pulse">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">YouTube video placeholder</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutVideo;

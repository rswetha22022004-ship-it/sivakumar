import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const SOCIAL_ICON = { linkedin: LinkedinIcon, github: GithubIcon };

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-ink-700">
      <div className="max-w-6xl mx-auto container-px py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile?.full_name || 'P. Sivakumar'}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {(profile?.social_links || []).map((link) => {
            const Icon = SOCIAL_ICON[link.platform] || Mail;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-accent transition-colors"
                aria-label={link.platform}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

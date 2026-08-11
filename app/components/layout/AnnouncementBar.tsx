import React from "react";

// --- Types based on your Strapi / API response ---
export interface AnnouncementBarProps {
    id?: number;
    message?: string | null;
    linkLabel?: string | null;
    linkUrl?: string | null;
    enabled?: boolean;
    __component?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
    message,
    linkLabel,
    linkUrl,
    enabled = true,
}) => {
    // If explicitly disabled, don't render anything
    if (!enabled) return null;

    const textToShow = linkLabel || message;

    return (
        <div className="w-full bg-[#1C1917] text-white py-2 px-4 text-center text-xs font-medium tracking-wider transition-colors">
            {linkUrl && textToShow ? (
                <a
                    href={linkUrl}
                    className="inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <span>{textToShow}</span>
                </a>
            ) : (
                <span>{textToShow}</span>
            )}
        </div>
    );
};

export default AnnouncementBar;
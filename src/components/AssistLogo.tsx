import React, { useState } from 'react';

interface AssistLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  taglineText?: string;
  highContrast?: boolean;
  className?: string;
}

export const AssistLogo: React.FC<AssistLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  taglineText,
  highContrast = false,
  className = ''
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-xl font-black',
    lg: 'text-2xl font-black',
    xl: 'text-4xl font-black'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Emblem */}
      <div
        className={`relative ${iconDimensions} rounded-2xl overflow-hidden flex items-center justify-center p-0.5 shadow-lg transition-transform hover:scale-105 shrink-0 ${
          highContrast
            ? 'bg-black border-2 border-yellow-400 text-yellow-300 shadow-yellow-950/30'
            : 'bg-[#0B0F17] border border-blue-500/30 shadow-blue-950/40'
        }`}
        aria-hidden="true"
      >
        {/* Glow ambient layer */}
        <span
          className={`absolute -inset-1 rounded-2xl opacity-30 blur-md pointer-events-none ${
            highContrast ? 'bg-yellow-400' : 'bg-blue-500'
          }`}
        />

        {!imgFailed ? (
          <img
            src="/assist-logo.jpg"
            alt="Assist Logo"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover rounded-xl relative z-10"
          />
        ) : (
          /* High Precision Vector SVG Fallback reproducing exact logo */
          <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-full h-full p-1"
          >
            <defs>
              <linearGradient id="logoSwoosh" x1="120" y1="380" x2="380" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="35%" stopColor="#2563EB" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="90" fill="#0A0D14" />
            {/* Upper White Arch of "A" */}
            <path
              d="M 248 116 C 272 116, 290 128, 304 148 L 364 240 C 340 252, 310 262, 278 274 L 254 220 C 250 212, 244 206, 236 206 C 228 206, 222 212, 218 220 L 182 300 C 152 328, 128 350, 114 366 C 98 344, 94 322, 102 296 L 194 152 C 208 128, 226 116, 248 116 Z"
              fill={highContrast ? '#facc15' : '#FFFFFF'}
            />
            {/* Lower Right Foot */}
            <path
              d="M 330 300 C 354 286, 380 270, 404 254 L 436 324 C 446 346, 442 368, 424 384 C 406 400, 384 402, 362 392 Z"
              fill={highContrast ? '#facc15' : '#FFFFFF'}
            />
            {/* Electric Blue Swoosh */}
            <path
              d="M 112 370 C 118 338, 144 316, 184 290 C 230 260, 290 236, 372 196 C 340 230, 286 270, 244 304 C 204 336, 172 376, 142 396 C 126 406, 108 398, 112 370 Z"
              fill={highContrast ? '#fef08a' : 'url(#logoSwoosh)'}
            />
            {/* Sparkle Star */}
            <g transform="translate(424, 160)">
              <path
                d="M 0 -32 Q 0 0, 32 0 Q 0 0, 0 32 Q 0 0, -32 0 Q 0 0, 0 -32 Z"
                fill={highContrast ? '#facc15' : '#38BDF8'}
              />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          </svg>
        )}
      </div>

      {/* Brand Typographic Identity */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`tracking-tight leading-none ${titleSizes}`}>
              <span className={highContrast ? 'text-yellow-300' : 'text-white'}>
                Assist
              </span>
              <span className={highContrast ? 'text-yellow-400' : 'text-blue-400'}>
                .ai
              </span>
            </span>

            {/* Clean pill badge */}
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300'
                  : 'bg-blue-950/60 text-blue-300 border-blue-500/40'
              }`}
            >
              India
            </span>
          </div>

          {showTagline && taglineText && (
            <span
              className={`text-xs mt-0.5 line-clamp-1 ${
                highContrast ? 'text-yellow-200' : 'text-slate-400'
              }`}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

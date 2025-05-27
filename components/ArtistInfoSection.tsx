import React, { useState } from 'react';
import { SocialLink } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from './ChevronIcons';
import { BiographyDownload } from './BiographyDownload';

interface ArtistInfoSectionProps {
  billedAs: string;
  labelAssociation: string[];
  bioSummary: string;
  fullBio?: string;
  socialLinks: SocialLink[];
  artistName?: string;
  biographyPdfUrl?: string;
}

export const ArtistInfoSection: React.FC<ArtistInfoSectionProps> = ({
  billedAs,
  labelAssociation,
  bioSummary,
  fullBio,
  socialLinks,
  artistName = 'K-SAIS',
  biographyPdfUrl
}) => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  return (
    <section className="bg-black py-10 md:py-16">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="mb-6 space-y-2 text-gray-300 text-center">
          <p className="drop-shadow-sm">{billedAs}</p>
          <p className="drop-shadow-sm">{labelAssociation.join(', ')}</p>
        </div>
        
        <div className="text-gray-300 mb-6 prose prose-invert max-w-none prose-p:text-gray-300 text-center md:text-left">
          <p className="drop-shadow-sm">{isBioExpanded && fullBio ? fullBio : bioSummary}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            {fullBio && (
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="inline-flex items-center text-[#f69f16] hover:text-orange-400 transition-colors duration-200 group drop-shadow-sm"
                aria-label={isBioExpanded ? 'Show less biography' : 'Show more biography'}
              >
                {isBioExpanded ? 'Leer menos' : 'Leer más'}
                {isBioExpanded ? <ChevronUpIcon className="ml-1 h-5 w-5 text-[#f69f16] group-hover:text-orange-400 group-hover:animate-pulse" /> : <ChevronDownIcon className="ml-1 h-5 w-5 text-[#f69f16] group-hover:text-orange-400 group-hover:animate-pulse" />}
              </button>
            )}
            
            <BiographyDownload 
              artistName={artistName}
              pdfUrl={biographyPdfUrl}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.platform} profile`}
              className="text-gray-400 hover:text-[#f69f16] transition-colors duration-200 p-2 rounded-full hover:bg-black/50 drop-shadow-sm"
            >
              {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
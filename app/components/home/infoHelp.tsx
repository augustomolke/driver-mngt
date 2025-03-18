import React from 'react';

interface infoHelpProps {
  title: React.ReactNode;
  trainingText: React.ReactNode;
  helpCenterText: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  icon?: React.ElementType;
}

export default function InfoHelp({ title, trainingText, helpCenterText, buttonText, buttonLink,  icon: Icon, }: infoHelpProps) {
  return (
    <div className='p-8'>
      <h1 className="text-sm text-[#384b7a] ">{title}</h1>
      <div className="p-4 flex gap-5 flex-col">
        <p className="text-[#a3a3a3] font-normal text-sm">{trainingText}</p>
        <p className="text-[#a3a3a3] font-normal text-sm">{helpCenterText}</p>
      </div>

      <div className="bg-[#384b7a] p-2 rounded-lg w-60">
        <a href={buttonLink} target="_blank" className="flex items-center gap-2 text-white cursor-pointer">
            {Icon && <Icon />}
          <div className="font-bold">{buttonText}</div>
        </a>
      </div>
    </div>
  );
}

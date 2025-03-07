import React from 'react';

interface infoHelpProps {
  title: string;
  trainingText: string;
  helpCenterText: string;
}

export default function ({ title, trainingText, helpCenterText }: infoHelpProps) {
  return (
    <div>
      <h1 className="text-2xl text-[#384b7a] font-bold">{title}</h1>
      <div className="text-[#a3a3a3] font-normal text-sm">{trainingText}</div>
      <div className="text-[#a3a3a3] font-normal text-sm">{helpCenterText}</div>
    </div>
  );
}
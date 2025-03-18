import React from 'react';

interface ApresentationDriverProps {
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
}

export default function ApresentationDriver({ title, descriptionOne, descriptionTwo }: ApresentationDriverProps) {
  return (
    <div>
      <h1 className="text-2xl text-[#384b7a] font-bold">{title}</h1>
      <div className="text-[#a3a3a3] font-normal text-sm">{descriptionOne}</div>
      <div className="text-[#a3a3a3] font-normal text-sm">{descriptionTwo}</div>
    </div>
  );
}

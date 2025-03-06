import React from 'react';

interface ApresentationDriverProps {
  title: string;
  message: string;
}

export default function ApresentationDriver({ title, message }: ApresentationDriverProps) {
  return (
    <div>
      <h1 className="text-2xl text-[#384b7a] font-bold">{title}</h1>
      <div className="text-[#a3a3a3] font-normal text-sm">{message}</div>
    </div>
  );
}

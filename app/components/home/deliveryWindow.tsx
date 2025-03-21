import React from 'react';

interface ApresentationDriverProps {
  title: string;
  Option1: string;
  Option2: string;
}

export default function DeliveryWindow({ title, Option1, Option2 }: ApresentationDriverProps) {
  return (
    <div className='p-4 flex flex-col gap-1'>
        <h1 className="text-sm text-[#a3a3a3] font-normal ">{title}</h1>
      <div className="mt-4">
        <div className="text-[#a3a3a3]  text-sm font-bold">{Option1}</div>
        <div className="text-[#a3a3a3]  text-sm font-bold">{Option2}</div>
      </div>
    </div>
  );
}

import React from 'react';

interface cardPendingProps {
  descriptionText: string;
  buttonText: string;
  buttonLink: string;
}

export default function cardPending({ descriptionText, buttonText, buttonLink }: cardPendingProps) {
  return (
    <div className='text-[#384b70] p-4 flex flex-col gap-3'>
      <p className='font-normal text-sm'> {descriptionText}</p>
      <a href={buttonLink} target="_blank" className=" cursor-pointer">
        <div className='bg-[#384b70] text-[#fff] p-2 w-52 rounded-lg text-base font-medium text-center'>{buttonText}</div>
      </a>
    </div>
  );
}

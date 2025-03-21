import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface RequiredApplicationsProps {
  iconSrc: StaticImageData;
  iconName: string;
  description: string;
  link: string;
}

export default function RequiredApplications({
  iconSrc,
  iconName,
  description,
  link,
}: RequiredApplicationsProps) {
  return (
  <Link href={link}  target="_blank">
    <div className="p-4 flex flex-col gap-1 text-black bg-[#fff] border-2 border-[#ebeae9] rounded-lg cursor-pointer">
      <div className="flex items-center gap-2">
        <Image src={iconSrc} alt={iconName} width={36} height={36} />
        <div className="font-semibold text-[#3c4b70]">{iconName}</div>
      </div>
      <div className="text-[#a3a3a3] text-base">{description}</div>
    </div>
  </Link>
  );
}

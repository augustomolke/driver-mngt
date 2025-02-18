import BottomNav from "@/components/bottom-nav";
import { auth } from "@/auth";
import { getEvent } from "@/lib/db/events";
import { getOptions } from "@/lib/db/options";
import { Badge } from "@/components/ui/badge";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const options = await getOptions(session?.user.driverId);

  const parsedOptions = options?.options && JSON.parse(options.options);

  return (
    <div className="h-full relative">
      {!parsedOptions?.hub ||
        (parsedOptions?.hub != "LM" && (
          <Badge
            id="ownflex-badge"
            className="absolute top-2 right-2 text-sm font-medium font-bold italic"
          >
            Flex
          </Badge>
        ))}

      {children}
      <div className="h-[64px]"></div>
    </div>
  );
}

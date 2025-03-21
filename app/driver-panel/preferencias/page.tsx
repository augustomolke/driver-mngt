import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { getPreferences } from "@/lib/db/preferences";
import { getLocations } from "@/gsheets/locations";
import { redirect } from "next/navigation";
import { getCurrentMode } from "@/lib/getCurrentMode";

function formatCep(input) {
  let number = input.toString();

  if (number.length === 7) {
    number = "0" + number;
  }
  return number.slice(0, 5) + "-" + number.slice(5);
}

export default async function Preferences() {
  const session = await auth();

  const { choosed_station, mode } = await getCurrentMode();

  if (mode === "OF") {
    redirect("/driver-panel/clusters");
  }

  const preferences = await getPreferences(
    session?.user.driverId.toString(),
    choosed_station
  );

  const locations = await getLocations(choosed_station);

  return (
    <PreferencesForm
      incentiveAlert
      user={session?.user}
      choosed_station={choosed_station}
      redirectTo={"/driver-panel"}
      preloadedPreferences={preferences}
      regions={locations.map((location) => ({
        value: `${location.buyer_city}_${location.cep5}`,
        label: `CEP - ${location.cep5}-XXX`,
        incentive: location.incentive,
        priority: location.priority,
      }))}
    />
  );
}

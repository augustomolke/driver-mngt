import PreferencesForm from "@/components/preferences-form";
import { auth } from "@/auth";
import { getPreferences } from "@/lib/db/preferences";
import { getLocations } from "@/gsheets/locations";
import { getClusters } from "@/lib/db/clusters";
import { redirect } from "next/navigation";
import OwnFlexCepsForm from "@/components/ownflex-ceps-form";
import { getCeps } from "@/gsheets/ownflex";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOptions } from "@/lib/db/options";
import OwnFlexPrefsForm from "@/components/ownflex-prefs-form";

function formatCep(input) {
  // Ensure the input is a string
  let number = input.toString();

  // Check if the number has only 7 digits
  if (number.length === 7) {
    number = "0" + number; // Append a 0 at the beginning
  }

  // Format the number as XXXXX-XXX
  return number.slice(0, 5) + "-" + number.slice(5);
}

export default async function Preferences() {
  const session = await auth();
  const preferences = await getPreferences(session?.user.driverId.toString());

  if (
    ["3333", "4444", "5555", "6666", "7777"].includes(
      session.user.driverId.toString()
    )
  ) {
    redirect("/driver-panel/clusters");
  }

  if (session?.user.ownflex) {
    // const clusters = await getClusters(
    //   session?.user.ownflex ? "OwnFlex" : session?.user.station
    // );

    // if (clusters.length > 0) {
    //   redirect("/driver-panel/clusters");
    // }

    const ceps2 = await getCeps();

    const options = await getOptions(session?.user.driverId);

    const regions = [...new Set(ceps2.map((r) => r["route"]))].filter(
      (a) => a.length > 0
    );

    const macroRegions = regions.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: ceps2
          .filter((c) => c["route"] == curr)
          .map((cep) => {
            const min = formatCep(cep["zipcode_min"]);
            const max = formatCep(cep["zipcode_max"]);
            return {
              ceps: `De ${min} a ${max}`,
              zona: cep["zona"],
              cluster: cep["cluster"],
            };
          }),
      };
    }, {});

    const driverFirstName = session?.user.driverName.split(" ")[0];

    const defaultValues =
      preferences.length > 0
        ? { ceps: preferences.map((p) => p.cep), macro: preferences[0].city }
        : { ceps: [], macro: "" };

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Olá, {driverFirstName}!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <CardDescription>
            Aqui você pode informar as regiões que gostaria de realizar entrega.
            Por favor,{" "}
            <strong>selecione no mapa abaixo pelo menos uma região.</strong>
          </CardDescription>

          {/* <OwnFlexPrefsForm
            defaultOptions={options ? JSON.parse(options.options) : undefined}
          /> */}

          <OwnFlexCepsForm
            loggedUser={session?.user}
            defaultValues={defaultValues}
            macroRegions={macroRegions}
            defaultOptions={options ? JSON.parse(options.options) : undefined}
          />
        </CardContent>
      </Card>
    );
  }

  const locations = await getLocations(
    session?.user.choosed_station || session?.user.station
  );

  return (
    <PreferencesForm
      incentiveAlert
      user={session?.user}
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

import { NoSpotsCard } from "@/components/no-spots-card";
export default async function Home() {
  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <NoSpotsCard />
        {/* <ConfirmationForm
          event_id={event.id}
          noSpots={
            preloadedPreferences.findIndex((pref) =>
              locations
                .filter((loc) => !!loc.priority)
                .map((loc) => loc.cep5)
                .includes(pref.cep)
            ) < 0
          }
          checks={checks}
        /> */}
      </main>
    </div>
  );
}

import PreferencesForm from "@/components/preferences-form";
import Scheduling from "@/components/scheduling-form";
import { fetchDates } from "@/lib/getEvents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const api_url = process.env.AUTH_API_URL;
const secret = process.env.SECRET;

export default async function Disponibilidade() {
  const dates = await fetchDates();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidade</CardTitle>
        <CardDescription>
          Você pode confirmar disponibilidade para té três dias adiante.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Scheduling dates={dates} />;
      </CardContent>
    </Card>
  );
}

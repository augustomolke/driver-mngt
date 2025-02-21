import { Alert, AlertTitle } from "./ui/alert";

export default function AllocationsCard({ allocations }) {
  return (
    <Alert variant={"info"}>
      <AlertTitle>Allocations</AlertTitle>
      <pre>{JSON.stringify(allocations, null, 2)}</pre>
    </Alert>
  );
}

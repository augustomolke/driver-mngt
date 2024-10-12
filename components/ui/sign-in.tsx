import { signIn } from "@/auth";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignIn() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bem vindo</CardTitle>
        <CardDescription>description</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
        >
          <input
            className=""
            type="hidden"
            name="redirectTo"
            value="/driver-panel"
          />
          <Label>
            Driver ID
            <Input className="text-primary" name="driverId" type="number" />
          </Label>
          <Label>
            Password
            <Input className="text-primary" name="password" type="password" />
          </Label>
          <Button type="submit">Entrar</Button>
        </form>
      </CardContent>
    </Card>
  );
}

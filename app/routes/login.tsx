import { Form } from "@remix-run/react"
import { ChartNoAxesGantt } from "lucide-react"
import { Button } from "~/components/ui/button"

export default function Login() {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/2 h-full p-8 bg-primary">
        <div className="flex items-center gap-2 mr-8">
          <ChartNoAxesGantt />
          <p className="text-xl font-semibold">Leetpals</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-full p-8">
        <p className="mb-4 text-xl font-bold">Welcome!</p>
        <div className="flex flex-col gap-2 w-96">
          <Form action="/auth/google" method="post">
            <Button className="flex gap-6 w-full" variant="outline">
              <img
                alt="google-icon"
                src="/google-icon.svg"
                height={20}
                width={20}
              />
              <p>Log in with Google</p>
            </Button>
          </Form>
          <Form action="/auth/github" method="post">
            <Button className="flex gap-6 w-full" variant="outline">
              <img
                alt="github-icon"
                src="/github-icon.svg"
                height={20}
                width={20}
              />
              <p>Log in with Github</p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

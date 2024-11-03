import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction
} from "@remix-run/node"
import { SideBar } from "~/components/side-bar"
import { Separator } from "~/components/ui/separator"
import { authenticator } from "~/services/auth.server"

export const meta: MetaFunction = () => {
  return [
    { title: "Leetpals" },
    { name: "description", content: "Welcome to Remix!" }
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  return user
}

export default function Index() {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="flex flex-col flex-1">
        <div className="p-3">Test</div>
        <Separator />
      </div>
    </div>
  )
}

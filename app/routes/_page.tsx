import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { SideBar } from "~/components/side-bar"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { authenticator } from "~/services/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  return user
}

export default function Layout() {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="flex flex-col flex-1">
        <div className="flex p-2 items-center justify-between">
          <div className="flex">
            <Button className="text-black" variant="link">
              Introduction
            </Button>
            <Button className="text-black" variant="link">
              Leaderboard
            </Button>
          </div>
          <Avatar className="mr-2">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Separator />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

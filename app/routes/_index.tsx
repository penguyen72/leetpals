import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction
} from "@remix-run/node"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable } from "~/components/data-table"
import { SideBar } from "~/components/side-bar"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
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

type User = {
  id: string
  name: string
  streak: number
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.display({
    id: "rank",
    header: "Rank",
    cell: (info) => info.row.index + 1
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor("streak", {
    header: "Submission Streak",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor("streak", {
    header: "Solved Problems",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  })
]

const data = [
  {
    id: "1",
    name: "Peyton",
    streak: 100
  }
]

export default function Index() {
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
          <p className="text-2xl font-semibold">Georgia Tech</p>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

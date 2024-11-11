import { User } from "@prisma/client"
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable } from "~/components/data-table"
import { getGroupInfo } from "./get-group.server"
import { Button } from "~/components/ui/button"
import { deleteGroup } from "./delete-group.server"

export async function loader({ request, params }: LoaderFunctionArgs) {
  return getGroupInfo({ request, params })
}

export async function action({ request, params }: ActionFunctionArgs) {
  return deleteGroup({ request, params })
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.display({
    id: "rank",
    header: "Rank",
    cell: (info) => info.row.index + 1
  }),
  columnHelper.accessor("username", {
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor("username", {
    header: "Submission Streak",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor("username", {
    header: "Solved Problems",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  })
]

export default function Page() {
  const { user, group, users } = useLoaderData<typeof loader>()

  const data: User[] = users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt)
  }))

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-semibold">{group.name}</p>
          <p>{group.description}</p>
        </div>
        {user.id === group.userId ? (
          <Form method="post">
            <Button type="submit" variant="destructive">
              Delete Group
            </Button>
          </Form>
        ) : null}
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

import { type MetaFunction } from "@remix-run/node"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable } from "~/components/data-table"

export const meta: MetaFunction = () => {
  return [
    { title: "Leetpals" },
    { name: "description", content: "Welcome to Remix!" }
  ]
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
  },
  {
    id: "2",
    name: "Peyton",
    streak: 100
  },
  {
    id: "4",
    name: "Peyton",
    streak: 100
  },
  {
    id: "5",
    name: "Peyton",
    streak: 100
  }
]

export default function Index() {
  return (
    <div>
      <p className="text-2xl font-semibold">Georgia Tech</p>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

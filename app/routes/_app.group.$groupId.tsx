import { useParams } from "@remix-run/react"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable } from "~/components/data-table"

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

export default function Page() {
  const { groupId } = useParams()
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      {groupId} <p className="text-2xl font-semibold">Georgia Tech</p>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

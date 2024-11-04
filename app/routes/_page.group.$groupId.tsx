import { useParams } from "@remix-run/react"

export default function Page() {
  const { groupId } = useParams()
  return <div>{groupId}</div>
}

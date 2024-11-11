import { useFetcher, useNavigate, useParams } from "@remix-run/react"
import { ChartNoAxesGantt, Hash } from "lucide-react"
import { useEffect } from "react"
import { Button } from "~/components/ui/button"
import { action } from "~/routes/api.create-group"
import { loader } from "~/routes/api.get-groups"

export function SideBar() {
  const params = useParams()
  const navigate = useNavigate()
  const postFetcher = useFetcher<typeof action>()
  const getFetcher = useFetcher<typeof loader>()

  useEffect(() => {
    if (getFetcher.state === "idle" && !getFetcher.data) {
      getFetcher.load("/api/get-groups")
    }
  }, [getFetcher])

  const handleCreate = () => {
    postFetcher.submit(null, { method: "post", action: "/api/create-group" })
  }

  const groupId = params.groupId

  return (
    <div className="flex flex-col w-60 border-r overflow-y-scroll">
      <div className="flex items-center gap-2 p-3 bg-background">
        <ChartNoAxesGantt />
        <p className="text-xl font-semibold">Leetpals</p>
      </div>
      <Button className="m-4" onClick={handleCreate}>
        Create Group
      </Button>
      <p className="px-4 font-semibold">Groups</p>
      <div className="flex flex-col p-2">
        {getFetcher.data?.map((group) => {
          return (
            <Button
              key={group.id}
              className="justify-start"
              variant={groupId === group.id ? "secondary" : "ghost"}
              onClick={() => navigate(`/group/${group.id}`)}
            >
              <Hash />
              {group.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

import { ChartNoAxesGantt, Hash } from "lucide-react"
import { Button } from "~/components/ui/button"

const test = "test"

export function SideBar() {
  return (
    <div className="flex flex-col w-60 border-r overflow-y-scroll">
      <div className="flex items-center gap-2 p-3 bg-background">
        <ChartNoAxesGantt />
        <p className="text-xl font-semibold">Leetpals</p>
      </div>
      <Button className="m-4">Create Group</Button>
      <p className="px-4 font-semibold">Groups</p>
      <div className="flex flex-col p-2">
        <Button className="justify-start" variant="ghost">
          <Hash />
          Georgia Tech
        </Button>
        <Button className="justify-start" variant="ghost">
          <Hash />
          Roommates
        </Button>
        <Button className="justify-start" variant="ghost">
          <Hash />
          Girlfriend
        </Button>
      </div>
    </div>
  )
}

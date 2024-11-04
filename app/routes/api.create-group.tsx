import { ActionFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/react"
import { authenticator } from "~/services/auth.server"
import { prisma } from "~/services/db.server"

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  })

  if (!existingUser) {
    throw new Response("Invalid User!")
  }

  const groupId = await prisma.$transaction(async (tx) => {
    const group = await tx.group.create({
      data: {
        userId: existingUser.id,
        name: "Georgia Tech",
        description: "Testing"
      }
    })
    const groupMember = await tx.groupMember.create({
      data: {
        groupId: group.id,
        userId: existingUser.id
      }
    })
    return groupMember.groupId
  })

  return redirect(`/group/${groupId}`)
}

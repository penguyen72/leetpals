import { json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { authenticator } from "~/services/auth.server"
import prisma from "~/services/db.server"

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }
  const groups = prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (!existingUser) {
      throw json("User Not Found!")
    }
    const memberGroups = await tx.groupMember.findMany({
      where: {
        userId: existingUser.id
      }
    })
    const groupIds = memberGroups.map((group) => group.groupId)
    const groups = await tx.group.findMany({
      where: {
        id: {
          in: groupIds
        },
        isActive: true
      }
    })
    return groups
  })

  return groups
}

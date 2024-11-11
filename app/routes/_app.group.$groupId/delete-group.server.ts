import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { authenticator } from "~/services/auth.server"
import prisma from "~/services/db.server"

export async function deleteGroup({
  request,
  params
}: {
  request: Request
  params: ActionFunctionArgs["params"]
}) {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/login")
  }

  const groupId = params.groupId

  if (!groupId) {
    throw new Response("Group ID Not Provided!")
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  })

  if (!existingUser) {
    throw new Response("Invalid User!")
  }

  const existingGroup = await prisma.group.findUnique({
    where: {
      id: groupId
    }
  })

  if (!existingGroup) {
    throw new Response("Group Does Not Exist!")
  }

  if (existingGroup.userId !== existingUser.id) {
    throw new Response("User Not Authorized to Delete Group!")
  }

  const deletedGroup = await prisma.group.update({
    data: {
      isActive: false
    },
    where: {
      id: groupId
    }
  })

  if (!deletedGroup) {
    throw new Response("Group Not Deleted!")
  }
  return redirect("/")
}

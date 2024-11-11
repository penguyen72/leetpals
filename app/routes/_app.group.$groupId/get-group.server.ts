import { json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import axios from "axios"
import { SUBMISSION_CALENDAR_QUERY } from "~/lib/query"
import { authenticator } from "~/services/auth.server"
import prisma from "~/services/db.server"

export async function getGroupInfo({
  request,
  params
}: {
  request: Request
  params: LoaderFunctionArgs["params"]
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

  const groupMembers = await prisma.groupMember.findMany({
    where: {
      groupId: groupId
    }
  })

  if (!groupMembers.length) {
    throw new Response("No Group Members in Group!")
  }

  const index = groupMembers.findIndex(
    (item) => item.userId === existingUser.id
  )

  if (index < 0) {
    throw new Response("User Cannot Access Group!")
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId
    }
  })

  if (!group) {
    throw new Response("Group Does Not Exist!")
  }

  const userIds = groupMembers.map((groupMember) => groupMember.userId)

  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds }
    }
  })

  return json({ user: existingUser, group, users })
}

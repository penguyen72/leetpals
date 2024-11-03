import { Authenticator } from "remix-auth"
import { GoogleStrategy } from "remix-auth-google"
import { GitHubStrategy } from "remix-auth-github"
import { sessionStorage } from "~/services/session.server"

export const authenticator = new Authenticator<User>(sessionStorage)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async ({ profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    const email = profile.emails[0].value
    return { email }
  }
)

const gitHubStrategy = new GitHubStrategy(
  {
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    redirectURI: "http://localhost:3000/auth/github/callback"
  },
  async ({ profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    const email = profile.emails[0].value
    return { email }
  }
)

authenticator.use(gitHubStrategy)
authenticator.use(googleStrategy)

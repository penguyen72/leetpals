export default function Page() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <p className="text-2xl font-semibold">Introduction</p>
      <p>
        LeetPals is your go-to app for tracking and sharing your LeetCode
        progress with friends. Here, you can create groups, invite friends, and
        keep each other motivated as you tackle challenges and build your skills
        together.
      </p>
      <p className="text-2xl font-semibold">How It Works</p>
      <ol className="list-decimal list-outside ml-4">
        <li>
          <span className="font-semibold">Link your Account:</span>Connect your
          LeetCode profile to your LeetPals account so that we can automatically
          sync your latest activity.
        </li>
        <li>
          <span className="font-semibold">Stay On Track:</span> We&apos;ll track
          your current submission streak, showing how active you&apos;ve been
          each day on LeetCode - perfect for spotting trends and pushing for
          that daily goal!
        </li>
        <li>
          <span className="font-semibold">Group Progress Tracking:</span> Using
          LeetCode&apos;s public GraphQL API, we gather profile data, stats, and
          activity in one easy-to-view dashboard.
        </li>
      </ol>
      <p>
        This lets you and your friends see each other&apos;s progress, celebrate
        wins, and challenge yourselves to new heights. Let&apos;s keep coding
        and growing with LeetPals!
      </p>
    </div>
  )
}

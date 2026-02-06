import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Page() {
  // Check who is currently logged in
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-50">
        <h1 className="text-4xl font-bold text-green-700">Success! 🎉</h1>
        <div className="mt-4 p-6 bg-white rounded shadow-lg text-center">
          <p className="text-lg">Welcome back,</p>
          <p className="text-2xl font-bold text-gray-800">{session.user.name}</p>
          <p className="text-gray-500 text-sm">Phone: {session.user.email}</p>
          <p className="text-gray-400 text-xs mt-2">User ID: {session.user.id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-700">Not Logged In</h1>
      <p className="mb-4">You need to sign in to see your dashboard.</p>
      {/* Link to the default NextAuth login page */}
      <a 
        href="/api/auth/signin" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </a>
    </div>
  );
}
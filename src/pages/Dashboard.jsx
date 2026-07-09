import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  async function logout() {
    await signOut();
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <div className="bg-white shadow rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-semibold">
          Welcome 👋
        </h2>

        <p className="mt-4">
          <strong>Email:</strong> {user?.email}
        </p>

        <p className="mt-2">
          <strong>User ID:</strong> {user?.id}
        </p>

        <button
          onClick={logout}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
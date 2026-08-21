import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleLogin = () => {
    login("demo-token-123");
    navigate("/profile", { replace: true });
  };

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Access</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">Login to continue</h2>
      <p className="mt-3 text-slate-600">Use the demo login to access the protected dashboard route.</p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Current session</p>
        <p className="mt-2 break-all">Token: {token ?? "No token yet"}</p>
      </div>

      <button
        type="button"
        onClick={handleLogin}
        className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
      >
        Login with demo token
      </button>
    </section>
  );
}

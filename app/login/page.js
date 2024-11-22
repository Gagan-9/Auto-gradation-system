"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // New state for admin code
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const [role, setRole] = useState(""); // New state for user role
  const [roleSelected, setRoleSelected] = useState(false); // New state to check if role is selected

  async function handleRegister(ev) {
    ev.preventDefault();
    setError(false);
    setLoginInProgress(true);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role, adminCode }), // Include adminCode if role is Admin
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: role === "Admin" ? "/admin-welcome" : "/edit-profile", // Redirect based on role
      });
    } else {
      setError(true);
    }

    setLoginInProgress(false);
  }

  async function handleLogin(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { 
      email, 
      password, 
      callbackUrl: role === "Admin" ? "/admin-welcome" : "/" // Redirect based on role
    });

    setLoginInProgress(false);
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-[72vh]">
      {error && (
        <div
          className="my-4 text-center bg-red-500 py-2 px-6 text-white rounded-full cursor-pointer"
          onClick={() => setError(false)}
        >
          An error has occurred. Please try again!!
        </div>
      )}
      <Link
        href="/"
        className="flex justify-center items-center mb-12 gap-5 text-white"
      >
        <img
          src="/logo2.png"
          alt="codegamy_logo"
          className="w-14 h-14 object-contain"
        />
        <h2 className="font-bold text-3xl">SolveIt</h2>
      </Link>
      {!roleSelected ? (
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setRole("Student"); setRoleSelected(true); }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Student
          </button>
          <button
            onClick={() => { setRole("Admin"); setRoleSelected(true); }}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Admin
          </button>
        </div>
      ) : (
        <form
          className="block mx-auto w-full max-w-[400px] px-2"
          onSubmit={isLogin ? handleLogin : handleRegister}
        >
          <div className="mb-4 text-black">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={email}
              disabled={loginInProgress}
              onChange={(ev) => setEmail(ev.target.value)}
              className="shadow-md p-4 bg-light-2 rounded-xl w-full sm:text-sm"
            />
          </div>
          <div className="mb-4 text-black">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="SSHHHH!! Your password"
              value={password}
              disabled={loginInProgress}
              onChange={(ev) => setPassword(ev.target.value)}
              className="shadow-md p-4 bg-light-2 rounded-xl w-full sm:text-sm"
            />
          </div>
          {role === "Admin" && (
            <div className="mb-4 text-black">
              <input
                type="text"
                id="adminCode"
                name="adminCode"
                placeholder="Admin Code"
                value={adminCode}
                disabled={loginInProgress}
                onChange={(ev) => setAdminCode(ev.target.value)}
                className="shadow-md p-4 bg-light-2 rounded-xl w-full sm:text-sm"
              />
            </div>
          )}
          <div className="text-center mb-4">
            <button
              type="submit"
              disabled={loginInProgress}
              className="inline-flex items-center px-8 py-2 mt-4 bg-green-700 hover:bg-green-700 text-white font-medium rounded-lg mx-auto disabled:cursor-not-allowed"
            >
              {loginInProgress ? (
                <img
                  src="loader.svg"
                  alt="loading"
                  className="w-6 h-6 object-contain"
                />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="text-center text-gray-700 mt-12">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </div>
        </form>
      )}
    </section>
  );
}

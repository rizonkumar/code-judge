"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/problems");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#ffa116]">CodeJudge</h1>
      </div>
      <div className="rounded-lg bg-[#282828] border border-[#ffffff1a] p-6">
        <h2 className="mb-1 text-[18px] font-semibold text-white">Sign In</h2>
        <p className="mb-5 text-[13px] text-[#eff1f67a]">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-[#ef474314] border border-[#ef47431a] p-3 text-[13px] text-[#ef4743]">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#eff1f6bf]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 w-full rounded-md bg-[#ffffff0d] border border-[#ffffff1a] px-3 text-[13px] text-[#eff1f6bf] placeholder:text-[#eff1f640] outline-none focus:border-[#ffa11666] transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#eff1f6bf]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-9 w-full rounded-md bg-[#ffffff0d] border border-[#ffffff1a] px-3 text-[13px] text-[#eff1f6bf] placeholder:text-[#eff1f640] outline-none focus:border-[#ffa11666] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-9 w-full rounded-md bg-[#ffa116] text-[13px] font-medium text-[#1a1a2e] hover:bg-[#ffb74d] disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-5 text-center text-[12px] text-[#eff1f67a]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#ffa116] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

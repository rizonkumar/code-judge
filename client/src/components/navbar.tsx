"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="h-[50px] border-b border-[#ffffff1a] bg-[#282828]">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/problems" className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#ffa116]">CodeJudge</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/problems"
                className="text-[13px] font-medium text-[#eff1f6bf] hover:text-white transition-colors"
              >
                Problems
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-[#ffffff0d] px-3 py-1">
                <div className="h-5 w-5 rounded-full bg-[#ffa116] flex items-center justify-center text-[10px] font-bold text-black">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-[#eff1f6bf]">
                  {user?.username}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-xs text-[#eff1f67a] hover:text-white"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[#eff1f6bf] hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-[#ffa116] px-3 py-1.5 text-[13px] font-medium text-[#1a1a2e] hover:bg-[#ffb74d] transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

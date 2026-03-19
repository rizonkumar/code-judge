"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DifficultyBadge from "@/components/difficulty-badge";
import { apiClient } from "@/lib/api";

interface Problem {
  _id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await apiClient.get<Problem[]>("/v1/problems");
        if (res.success && res.data) {
          setProblems(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch problems:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  const filtered = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffa116] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-[280px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#eff1f67a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full rounded-md bg-[#ffffff0d] border border-[#ffffff1a] pl-9 pr-3 text-[13px] text-[#eff1f6bf] placeholder:text-[#eff1f640] outline-none focus:border-[#ffa11666] transition-colors"
          />
        </div>
        <span className="text-[12px] text-[#eff1f67a]">
          {filtered.length} / {problems.length}
        </span>
      </div>

      {/* Difficulty tags */}
      <div className="mb-4 flex gap-2">
        {["All Topics", "Easy", "Medium", "Hard"].map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-[#ffffff0d] px-3 py-1 text-[11px] font-medium text-[#eff1f6bf] hover:bg-[#ffffff1a] transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-lg bg-[#ffffff0d] py-16 text-center text-[13px] text-[#eff1f67a]">
          No problems found.
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[60px_1fr_100px] items-center px-4 py-2.5 text-[11px] font-medium text-[#eff1f67a]">
            <span>Status</span>
            <span>Title</span>
            <span className="text-right">Difficulty</span>
          </div>

          {/* Rows */}
          {filtered.map((problem, index) => (
            <Link
              key={problem._id}
              href={`/problems/${problem._id}`}
              className={`grid grid-cols-[60px_1fr_100px] items-center px-4 py-2.5 transition-colors hover:bg-[#ffffff0d] ${
                index % 2 === 0 ? "bg-[#ffffff08]" : "bg-transparent"
              }`}
            >
              <span className="text-[12px] text-[#eff1f67a]">
                {index + 1}.
              </span>
              <span className="text-[13px] text-[#eff1f6bf] hover:text-[#ffa116] transition-colors">
                {problem.title}
              </span>
              <span className="flex justify-end">
                <DifficultyBadge difficulty={problem.difficulty} />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import CodeEditor from "@/components/code-editor";
import DifficultyBadge from "@/components/difficulty-badge";
import TestResults from "@/components/test-results";
import { apiClient } from "@/lib/api";

interface TestCase {
  input: string;
  output: string;
}

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  testCases: TestCase[];
}

interface SubmissionStatus {
  jobId: string;
  status: string;
  result: {
    totalTests: number;
    passed: number;
    failed: number;
    results: {
      testCase: number;
      input: string;
      expectedOutput: string;
      actualOutput: string;
      passed: boolean;
      error?: string;
    }[];
  } | null;
  error: string | null;
}

const DEFAULT_CODE = `# Write your Python solution here
`;

export default function ProblemDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionStatus | null>(null);
  const [activeTab, setActiveTab] = useState<"testcase" | "result">("testcase");
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await apiClient.get<Problem>(`/v1/problems/${id}`);
        if (res.success && res.data) {
          setProblem(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch problem:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [id]);

  const pollStatus = useCallback((jobId: string) => {
    pollingRef.current = setInterval(async () => {
      try {
        const res = await apiClient.get<SubmissionStatus>(
          `/v1/evaluator/status/${jobId}`
        );
        if (res.success && res.data) {
          setSubmission(res.data);
          if (res.data.status === "completed" || res.data.status === "failed") {
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }
            setSubmitting(false);
          }
        }
      } catch {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
        setSubmitting(false);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleSubmit = async () => {
    if (!problem) return;
    setSubmitting(true);
    setSubmission(null);
    setActiveTab("result");

    try {
      const res = await apiClient.post<{ jobId: string }>("/v1/evaluator/submit", {
        problemId: problem._id,
        code,
        language: "python",
      });

      if (res.success && res.data) {
        setSubmission({
          jobId: res.data.jobId,
          status: "waiting",
          result: null,
          error: null,
        });
        pollStatus(res.data.jobId);
      }
    } catch {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-50px)] items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffa116] border-t-transparent" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-[calc(100vh-50px)] items-center justify-center text-[13px] text-[#eff1f67a]">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-50px)]">
      {/* Left Panel - Description */}
      <div className="w-1/2 flex flex-col border-r border-[#ffffff1a] bg-[#1a1a2e]">
        {/* Tab header */}
        <div className="flex h-[38px] items-center border-b border-[#ffffff1a] bg-[#282828] px-4">
          <span className="text-[12px] font-medium text-[#ffa116]">Description</span>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-[18px] font-semibold text-white">{problem.title}</h1>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <div className="mb-6 text-[14px] leading-[1.8] text-[#eff1f6bf] whitespace-pre-wrap">
            {problem.description}
          </div>

          {problem.testCases.length > 0 && (
            <div className="space-y-5">
              {problem.testCases.slice(0, 3).map((tc, i) => (
                <div key={i}>
                  <p className="mb-2 text-[14px] font-semibold text-white">
                    Example {i + 1}:
                  </p>
                  <div className="rounded-md bg-[#ffffff0d] border border-[#ffffff0d] p-3 font-mono text-[13px] leading-[1.7]">
                    <div>
                      <span className="font-bold text-white">Input: </span>
                      <span className="text-[#eff1f6bf]">{tc.input}</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Output: </span>
                      <span className="text-[#eff1f6bf]">{tc.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Editor + Testcase/Results */}
      <div className="flex w-1/2 flex-col bg-[#1a1a2e]">
        {/* Editor Header */}
        <div className="flex h-[38px] items-center justify-between border-b border-[#ffffff1a] bg-[#282828] px-4">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-medium text-[#eff1f6bf]">Code</span>
            <span className="text-[11px] text-[#eff1f67a]">Python 3</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || !code.trim()}
            className="rounded-md bg-[#2cbb5d] px-4 py-1 text-[12px] font-medium text-white hover:bg-[#36d068] disabled:opacity-50 transition-colors"
          >
            {submitting ? "Running..." : "Submit"}
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-0">
          <CodeEditor value={code} onChange={setCode} language="python" />
        </div>

        {/* Bottom Panel - Testcase / Test Result */}
        <div className="h-[35%] flex flex-col border-t border-[#ffffff1a]">
          {/* Tabs */}
          <div className="flex h-[38px] items-center gap-0 border-b border-[#ffffff1a] bg-[#282828]">
            <button
              onClick={() => setActiveTab("testcase")}
              className={`h-full px-4 text-[12px] font-medium transition-colors border-b-2 ${
                activeTab === "testcase"
                  ? "border-white text-white"
                  : "border-transparent text-[#eff1f67a] hover:text-[#eff1f6bf]"
              }`}
            >
              Testcase
            </button>
            <button
              onClick={() => setActiveTab("result")}
              className={`h-full px-4 text-[12px] font-medium transition-colors border-b-2 ${
                activeTab === "result"
                  ? "border-white text-white"
                  : "border-transparent text-[#eff1f67a] hover:text-[#eff1f6bf]"
              }`}
            >
              Test Result
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "testcase" ? (
              problem.testCases.length > 0 ? (
                <div className="space-y-3">
                  {problem.testCases.slice(0, 3).map((tc, i) => (
                    <div key={i} className="space-y-1.5">
                      <p className="text-[11px] font-medium text-[#eff1f67a]">
                        Case {i + 1}
                      </p>
                      <div className="rounded bg-[#ffffff0d] px-3 py-2 font-mono text-[12px] text-[#eff1f6bf]">
                        {tc.input}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-[#eff1f67a]">
                  No test cases available.
                </p>
              )
            ) : submission ? (
              <TestResults
                status={submission.status}
                result={submission.result}
                error={submission.error}
              />
            ) : (
              <p className="text-[13px] text-[#eff1f67a]">
                You must run your code first.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

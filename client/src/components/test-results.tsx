"use client";

import { cn } from "@/lib/utils";

interface TestCaseResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

interface EvaluationResult {
  totalTests: number;
  passed: number;
  failed: number;
  results: TestCaseResult[];
}

interface TestResultsProps {
  status: string;
  result: EvaluationResult | null;
  error: string | null;
}

export default function TestResults({ status, result, error }: TestResultsProps) {
  if (status === "waiting" || status === "active" || status === "delayed") {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#ffa116] border-t-transparent" />
        <span className="text-[13px] text-[#eff1f67a]">Pending...</span>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div>
        <p className="mb-2 text-[15px] font-semibold text-[#ef4743]">Runtime Error</p>
        <pre className="rounded bg-[#ffffff0d] p-3 text-[12px] font-mono text-[#ef4743] whitespace-pre-wrap">
          {error || "An error occurred while evaluating your code."}
        </pre>
      </div>
    );
  }

  if (status === "completed" && result) {
    const allPassed = result.passed === result.totalTests;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-[18px] font-bold",
              allPassed ? "text-[#2cbb5d]" : "text-[#ef4743]"
            )}
          >
            {allPassed ? "Accepted" : "Wrong Answer"}
          </span>
        </div>
        <p className="text-[12px] text-[#eff1f67a]">
          {result.passed}/{result.totalTests} testcases passed
        </p>

        <div className="space-y-3">
          {result.results.map((tc) => (
            <div key={tc.testCase} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    tc.passed ? "bg-[#2cbb5d]" : "bg-[#ef4743]"
                  )}
                />
                <span className="text-[12px] font-medium text-[#eff1f6bf]">
                  Case {tc.testCase}
                </span>
              </div>
              <div className="space-y-1 pl-4">
                <div className="rounded bg-[#ffffff0d] px-3 py-1.5 font-mono text-[12px] text-[#eff1f6bf]">
                  <span className="text-[#eff1f67a]">Input = </span>{tc.input}
                </div>
                <div className="rounded bg-[#ffffff0d] px-3 py-1.5 font-mono text-[12px] text-[#eff1f6bf]">
                  <span className="text-[#eff1f67a]">Expected = </span>{tc.expectedOutput}
                </div>
                {!tc.passed && (
                  <div className="rounded bg-[#ef474314] px-3 py-1.5 font-mono text-[12px] text-[#ef4743]">
                    <span className="text-[#ef474399]">Output = </span>{tc.actualOutput || "(empty)"}
                  </div>
                )}
                {tc.error && (
                  <div className="rounded bg-[#ef474314] px-3 py-1.5 font-mono text-[12px] text-[#ef4743]">
                    {tc.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

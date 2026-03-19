import { cn } from "@/lib/utils";

const difficultyConfig = {
  easy: "text-[#2cbb5d]",
  medium: "text-[#ffc01e]",
  hard: "text-[#ef4743]",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) {
  return (
    <span className={cn("text-[11px] font-medium", difficultyConfig[difficulty])}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}

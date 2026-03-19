import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const problemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    difficulty: String,
    testCases: [{ input: String, output: String }],
    editorial: String,
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

const problems = [
  { title: "Two Sum", difficulty: "easy", description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.", testCases: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }, { input: "nums = [3,2,4], target = 6", output: "[1,2]" }, { input: "nums = [3,3], target = 6", output: "[0,1]" }] },
  { title: "Add Two Numbers", difficulty: "medium", description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.", testCases: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" }, { input: "l1 = [0], l2 = [0]", output: "[0]" }] },
  { title: "Longest Substring Without Repeating Characters", difficulty: "medium", description: "Given a string s, find the length of the longest substring without repeating characters.", testCases: [{ input: 's = "abcabcbb"', output: "3" }, { input: 's = "bbbbb"', output: "1" }, { input: 's = "pwwkew"', output: "3" }] },
  { title: "Median of Two Sorted Arrays", difficulty: "hard", description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).", testCases: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" }, { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }] },
  { title: "Longest Palindromic Substring", difficulty: "medium", description: "Given a string s, return the longest palindromic substring in s.", testCases: [{ input: 's = "babad"', output: '"bab"' }, { input: 's = "cbbd"', output: '"bb"' }] },
  { title: "Zigzag Conversion", difficulty: "medium", description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows. Write the code that will take a string and make this conversion given a number of rows.', testCases: [{ input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' }, { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' }] },
  { title: "Reverse Integer", difficulty: "medium", description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.", testCases: [{ input: "x = 123", output: "321" }, { input: "x = -123", output: "-321" }, { input: "x = 120", output: "21" }] },
  { title: "String to Integer (atoi)", difficulty: "medium", description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.", testCases: [{ input: 's = "42"', output: "42" }, { input: 's = "   -42"', output: "-42" }, { input: 's = "4193 with words"', output: "4193" }] },
  { title: "Palindrome Number", difficulty: "easy", description: "Given an integer x, return true if x is a palindrome, and false otherwise.", testCases: [{ input: "x = 121", output: "true" }, { input: "x = -121", output: "false" }, { input: "x = 10", output: "false" }] },
  { title: "Regular Expression Matching", difficulty: "hard", description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.", testCases: [{ input: 's = "aa", p = "a"', output: "false" }, { input: 's = "aa", p = "a*"', output: "true" }] },
  { title: "Container With Most Water", difficulty: "medium", description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.", testCases: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }, { input: "height = [1,1]", output: "1" }] },
  { title: "Integer to Roman", difficulty: "medium", description: "Given an integer, convert it to a roman numeral.", testCases: [{ input: "num = 3749", output: '"MMMDCCXLIX"' }, { input: "num = 58", output: '"LVIII"' }] },
  { title: "Roman to Integer", difficulty: "easy", description: "Given a roman numeral, convert it to an integer.", testCases: [{ input: 's = "III"', output: "3" }, { input: 's = "LVIII"', output: "58" }, { input: 's = "MCMXCIV"', output: "1994" }] },
  { title: "Longest Common Prefix", difficulty: "easy", description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.", testCases: [{ input: 'strs = ["flower","flow","flight"]', output: '"fl"' }, { input: 'strs = ["dog","racecar","car"]', output: '""' }] },
  { title: "3Sum", difficulty: "medium", description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.", testCases: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }, { input: "nums = [0,1,1]", output: "[]" }] },
  { title: "3Sum Closest", difficulty: "medium", description: "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.", testCases: [{ input: "nums = [-1,2,1,-4], target = 1", output: "2" }, { input: "nums = [0,0,0], target = 1", output: "0" }] },
  { title: "Letter Combinations of a Phone Number", difficulty: "medium", description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.", testCases: [{ input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }, { input: 'digits = ""', output: "[]" }] },
  { title: "4Sum", difficulty: "medium", description: "Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that the sum equals target.", testCases: [{ input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" }] },
  { title: "Remove Nth Node From End of List", difficulty: "medium", description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.", testCases: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }, { input: "head = [1], n = 1", output: "[]" }] },
  { title: "Valid Parentheses", difficulty: "easy", description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.', testCases: [{ input: 's = "()"', output: "true" }, { input: 's = "()[]{}"', output: "true" }, { input: 's = "(]"', output: "false" }] },
  { title: "Merge Two Sorted Lists", difficulty: "easy", description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.", testCases: [{ input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }, { input: "list1 = [], list2 = []", output: "[]" }] },
  { title: "Generate Parentheses", difficulty: "medium", description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.", testCases: [{ input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' }, { input: "n = 1", output: '["()"]' }] },
  { title: "Merge k Sorted Lists", difficulty: "hard", description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.", testCases: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }] },
  { title: "Swap Nodes in Pairs", difficulty: "medium", description: "Given a linked list, swap every two adjacent nodes and return its head.", testCases: [{ input: "head = [1,2,3,4]", output: "[2,1,4,3]" }, { input: "head = []", output: "[]" }] },
  { title: "Reverse Nodes in k-Group", difficulty: "hard", description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.", testCases: [{ input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" }, { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }] },
  { title: "Remove Duplicates from Sorted Array", difficulty: "easy", description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.", testCases: [{ input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" }, { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]" }] },
  { title: "Remove Element", difficulty: "easy", description: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.", testCases: [{ input: "nums = [3,2,2,3], val = 3", output: "2, nums = [2,2,_,_]" }, { input: "nums = [0,1,2,2,3,0,4,2], val = 2", output: "5, nums = [0,1,4,0,3,_,_,_]" }] },
  { title: "Find the Index of the First Occurrence in a String", difficulty: "easy", description: 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.', testCases: [{ input: 'haystack = "sadbutsad", needle = "sad"', output: "0" }, { input: 'haystack = "leetcode", needle = "leeto"', output: "-1" }] },
  { title: "Divide Two Integers", difficulty: "medium", description: "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.", testCases: [{ input: "dividend = 10, divisor = 3", output: "3" }, { input: "dividend = 7, divisor = -3", output: "-2" }] },
  { title: "Substring with Concatenation of All Words", difficulty: "hard", description: "You are given a string s and an array of strings words. All the strings of words are of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.", testCases: [{ input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: "[0,9]" }] },
];

// Generate more problems programmatically to reach 500+
const topics = [
  "Array", "String", "Hash Table", "Dynamic Programming", "Math",
  "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Tree",
  "Breadth-First Search", "Matrix", "Bit Manipulation", "Two Pointers",
  "Stack", "Heap", "Graph", "Linked List", "Recursion", "Sliding Window",
  "Backtracking", "Union Find", "Trie", "Divide and Conquer", "Monotonic Stack",
];

const adjectives = [
  "Maximum", "Minimum", "Longest", "Shortest", "Best", "Optimal",
  "Valid", "Unique", "Beautiful", "Special", "Perfect", "Complete",
  "Balanced", "Symmetric", "Circular", "Binary", "Consecutive",
  "Alternating", "Increasing", "Decreasing", "Non-overlapping",
];

const nouns = [
  "Subarray", "Substring", "Subsequence", "Path", "Sum", "Product",
  "Difference", "Window", "Interval", "Sequence", "Pair", "Triplet",
  "Group", "Partition", "Segment", "Range", "Chain", "Cycle",
  "Component", "Island", "Region", "Level", "Depth", "Height",
];

const actions = [
  "Find", "Count", "Calculate", "Check", "Determine", "Return",
  "Compute", "Search", "Detect", "Verify", "Evaluate", "Identify",
];

const structures = [
  "in an Array", "in a String", "in a Binary Tree", "in a Linked List",
  "in a Matrix", "in a Graph", "in a Grid", "of Integers",
  "of Characters", "of Nodes", "of Elements", "in a Sequence",
];

function generateTitle(i: number): string {
  const adj = adjectives[i % adjectives.length];
  const noun = nouns[i % nouns.length];
  const struct = structures[i % structures.length];
  const action = actions[i % actions.length];

  const patterns = [
    `${action} the ${adj} ${noun} ${struct}`,
    `${adj} ${noun} ${struct}`,
    `${action} All ${adj} ${noun}s`,
    `${noun} ${struct} ${i + 31}`,
    `${adj} ${noun} Problem`,
    `${action} ${noun} with ${adj} Constraint`,
    `Number of ${adj} ${noun}s ${struct}`,
    `${adj} ${noun} Transformation`,
  ];

  return patterns[i % patterns.length];
}

function generateDescription(title: string, difficulty: string): string {
  const constraints = difficulty === "easy"
    ? "1 <= n <= 1000"
    : difficulty === "medium"
    ? "1 <= n <= 10^5"
    : "1 <= n <= 10^6";

  return `Given the input as described below, solve the "${title}" problem.\n\nYou need to implement an efficient solution.\n\nConstraints:\n- ${constraints}\n- Elements can be positive or negative integers\n- Return the result as specified in the examples`;
}

function generateTestCases(i: number) {
  const a = (i * 7 + 3) % 20;
  const b = (i * 13 + 5) % 50;
  return [
    { input: `n = ${a + 1}`, output: `${(a + 1) * 2}` },
    { input: `n = ${b + 1}`, output: `${(b + 1) * 2}` },
    { input: `n = 1`, output: "2" },
  ];
}

async function seed() {
  const dbUrl = process.env.ATLAS_DB_URL || "mongodb://localhost:27017/codejudge";
  console.log(`Connecting to ${dbUrl}...`);
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");

  // Clear existing problems
  await Problem.deleteMany({});
  console.log("Cleared existing problems");

  // Insert the 30 real LeetCode-style problems
  const allProblems = [...problems];

  // Generate 500 more problems
  const difficulties: Array<"easy" | "medium" | "hard"> = ["easy", "medium", "hard"];
  for (let i = 0; i < 500; i++) {
    const diff = difficulties[i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2];
    const title = generateTitle(i);
    allProblems.push({
      title: `${i + 31}. ${title}`,
      difficulty: diff,
      description: generateDescription(title, diff),
      testCases: generateTestCases(i),
    });
  }

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < allProblems.length; i += batchSize) {
    const batch = allProblems.slice(i, i + batchSize);
    await Problem.insertMany(batch);
    console.log(`Inserted ${Math.min(i + batchSize, allProblems.length)} / ${allProblems.length}`);
  }

  console.log(`\nSeeded ${allProblems.length} problems successfully!`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

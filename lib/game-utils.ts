/**
 * Game utilities for Wordle Wars
 */

import { readFileSync } from "fs";
import { join } from "path";

// Read word lists at build time and cache them in memory
const wordListPath = join(process.cwd(), "constant", "all-words.txt");
const answerListPath = join(process.cwd(), "constant", "answer-words.txt");

let wordList: string[] = [];
let answerList: string[] = [];

// Load word lists synchronously at module initialization
try {
  console.log(
    `🔄 Loading word lists at build time... (${new Date().toISOString()})`
  );

  const allWordsRaw = readFileSync(wordListPath, "utf-8");
  const answerWordsRaw = readFileSync(answerListPath, "utf-8");

  wordList = allWordsRaw
    .trim()
    .split("\n")
    .map((word: string) => word.toLowerCase());
  answerList = answerWordsRaw
    .trim()
    .split("\n")
    .map((word: string) => word.toLowerCase());

  console.log(
    `✅ Word lists loaded successfully at ${new Date().toISOString()}:`
  );
  console.log(`   - Total words: ${wordList.length}`);
  console.log(`   - Answer words: ${answerList.length}`);
  console.log(`   - Sample words: ${wordList.slice(0, 5).join(", ")}`);
  console.log(`   - Sample answers: ${answerList.slice(0, 5).join(", ")}`);
} catch (error) {
  console.error("❌ Error loading word lists:", error);
  // Fallback to minimal lists if file loading fails
  process.exit(1);
}

/**
 * Load and preprocess the 5-letter word list
 * @returns string[] Array of 5-letter words for validation
 */
export function loadWordList(): string[] {
  return wordList;
}

/**
 * Load the answer word list (common words only)
 * @returns string[] Array of common 5-letter words for answers
 */
export function loadAnswerList(): string[] {
  return answerList;
}

/**
 * Get a random word from the answer list (common words only)
 * @returns string A random 5-letter word suitable for answers
 */
export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * answerList.length);
  return answerList[randomIndex];
}

/**
 * Validate if a word is in the comprehensive word list
 * @param word The word to validate
 * @returns boolean True if the word is valid for guessing
 */
export function isValidWord(word: string): boolean {
  return wordList.includes(word.toLowerCase());
}

/**
 * Get the total number of words in the validation list
 * @returns number Number of available words for validation
 */
export function getWordCount(): number {
  return wordList.length;
}

/**
 * Get the total number of answer words
 * @returns number Number of available answer words
 */
export function getAnswerCount(): number {
  return answerList.length;
}

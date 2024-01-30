import { mkdir, access, writeFile } from "fs/promises";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const dirPath = `${process.env.GITHUB_WORKSPACE}/${year}/${month}/${day}/`;
export const solutionFileName = "solution.md";

export const questionFileName = "question.md";

export async function createFileIfNotExists(fileName, content) {
  const filePath = dirPath + fileName;
  try {
    await access(filePath);
    console.log("File already exists:", filePath);
    await writeFile(filePath, content);
    console.log("File content replaced:", filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(dirPath, { recursive: true });
      await writeFile(filePath, content);
      console.log("File created:", filePath);
    } else {
      throw error;
    }
  }
}

import {
  getDailyQuestion,
  getQeustionSolutionArticleDetail,
  getQuestionSolutionArticles,
} from "./utils/api.js";
import {
  createFileIfNotExists,
  solutionFileName,
  questionFileName,
} from "./utils/files.js";

const question = await getDailyQuestion();

const solutionArticles = await getQuestionSolutionArticles(question.slug);

const solutionArticleDetail = await getQeustionSolutionArticleDetail(
  solutionArticles[0].node.slug
);

const solutionArticleContent = solutionArticleDetail.content;

createFileIfNotExists(solutionFileName, solutionArticleContent);
createFileIfNotExists(questionFileName, question.link);

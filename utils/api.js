const url = "https://leetcode.cn/graphql/";

const headers = {
  "content-type": "application/json",
  Origin: "https://leetcode.cn",
  Referer: "https://leetcode.cn/",
};

/**
 * @returns {Promise<{
 * id: string,
 * name: string,
 * slug: string,
 * progress: number,
 * link: string,
 * premiumOnly: boolean
 * }[]>}
 */
export async function getDailyQuestion() {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query:
        "\n    query CalendarTaskSchedule($days: Int!) {\n  calendarTaskSchedule(days: $days) {\n    contests {\n      id\n      name\n      slug\n      progress\n      link\n      premiumOnly\n    }\n    dailyQuestions {\n      id\n      name\n      slug\n      progress\n      link\n      premiumOnly\n    }\n    studyPlans {\n      id\n      name\n      slug\n      progress\n      link\n      premiumOnly\n    }\n  }\n}\n    ",
      variables: {
        days: 0,
      },
      operationName: "CalendarTaskSchedule",
    }),
    headers,
  });

  const data = await response.json();
  const dailyQuestions = data.data.calendarTaskSchedule.dailyQuestions;
  const firstQuestion = dailyQuestions[0];

  return firstQuestion;
}

/**
 * @param {string} questionSlug
 * @returns {Promise<{
 *  node: {
 *     title: string
 *     slug: string,
 *      author: {
 *          username: string
 *      }
 * }
 * }[]}>} The question detail.
 */
export async function getQuestionSolutionArticles(questionSlug) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query:
        "\n    query questionTopicsList($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {\n  questionSolutionArticles(\n    questionSlug: $questionSlug\n    skip: $skip\n    first: $first\n    orderBy: $orderBy\n    userInput: $userInput\n    tagSlugs: $tagSlugs\n  ) {\n    totalNum\n    edges {\n      node {\n        ipRegion\n        rewardEnabled\n        canEditReward\n        uuid\n        title\n        slug\n        sunk\n        chargeType\n        status\n        identifier\n        canEdit\n        canSee\n        reactionType\n        hasVideo\n        favoriteCount\n        upvoteCount\n        reactionsV2 {\n          count\n          reactionType\n        }\n        tags {\n          name\n          nameTranslated\n          slug\n          tagType\n        }\n        createdAt\n        thumbnail\n        author {\n          username\n          profile {\n            userAvatar\n            userSlug\n            realName\n            reputation\n          }\n        }\n        summary\n        topic {\n          id\n          commentCount\n          viewCount\n          pinned\n        }\n        byLeetcode\n        isMyFavorite\n        isMostPopular\n        isEditorsPick\n        hitCount\n        videosInfo {\n          videoId\n          coverUrl\n          duration\n        }\n      }\n    }\n  }\n}\n    ",
      variables: {
        questionSlug,
        skip: 0,
        first: 15,
        orderBy: "DEFAULT",
        userInput: "",
        tagSlugs: ["javascript"],
      },
      operationName: "questionTopicsList",
    }),
    headers,
  });

  const data = await response.json();
  const articles = data.data.questionSolutionArticles.edges;

  return articles;
}

/**
 * @param {string} articleSlug
 * @returns {Promise<{
 *  content: string,
 *  slug: string,
 *  canSee: boolean,
 *  next: {
 *      slug: string
 *      title: string
 * }
 * }>}  The solution article detail.
 */
export async function getQeustionSolutionArticleDetail(articleSlug) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query:
        "\n    query discussTopic($slug: String) {\n  solutionArticle(slug: $slug, orderBy: DEFAULT) {\n    ...solutionArticle\n    content\n    next {\n      slug\n      title\n    }\n    prev {\n      slug\n      title\n    }\n  }\n}\n    \n    fragment solutionArticle on SolutionArticleNode {\n  ipRegion\n  rewardEnabled\n  canEditReward\n  uuid\n  title\n  content\n  slateValue\n  slug\n  sunk\n  chargeType\n  status\n  identifier\n  canEdit\n  canSee\n  reactionType\n  reactionsV2 {\n    count\n    reactionType\n  }\n  tags {\n    name\n    nameTranslated\n    slug\n    tagType\n  }\n  createdAt\n  thumbnail\n  author {\n    username\n    isDiscussAdmin\n    isDiscussStaff\n    profile {\n      userAvatar\n      userSlug\n      realName\n      reputation\n    }\n  }\n  summary\n  topic {\n    id\n    subscribed\n    commentCount\n    viewCount\n    post {\n      id\n      status\n      voteStatus\n      isOwnPost\n    }\n  }\n  byLeetcode\n  isMyFavorite\n  isMostPopular\n  favoriteCount\n  isEditorsPick\n  hitCount\n  videosInfo {\n    videoId\n    coverUrl\n    duration\n  }\n  question {\n    titleSlug\n    questionFrontendId\n  }\n}\n    ",
      variables: {
        slug: articleSlug,
      },
      operationName: "discussTopic",
    }),
    headers,
  });
  const data = await response.json();
  return data.data.solutionArticle;
}

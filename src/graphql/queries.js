/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionAnswer = /* GraphQL */ `
  query GetQuestionAnswer($id: ID!) {
    getQuestionAnswer(id: $id) {
      id
      userId
      q1
      q2
      q2q1
      q2q2
      q3
      q3q1
      q4
      q4q1
      q4q2
      q4q3
      q5
      q5q1
      q5q1q1
      q6
      q7
      q8
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionAnswers = /* GraphQL */ `
  query ListQuestionAnswers(
    $filter: ModelQuestionAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        q1
        q2
        q2q1
        q2q2
        q3
        q3q1
        q4
        q4q1
        q4q2
        q4q3
        q5
        q5q1
        q5q1q1
        q6
        q7
        q8
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

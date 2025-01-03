export type ColumnType = {
  id: TaskStatuses,
  title: string,
}

export type TaskType = {
  id: number,
  title: string
  description: string,
  status: TaskStatuses
}

export enum TaskStatuses {
  FIRST = "First",
  SECOND = "Second",
}

export const COLUMNS: ColumnType[] = [
  { id: TaskStatuses.FIRST, title: "First Name" },
  { id: TaskStatuses.SECOND, title: "Second Name" }
];


export const INITIAL_VALUES: TaskType[] = [
  {
    id: 1,
    title: 'Plan a space mission',
    description: 'Draft the proposal for the next interstellar expedition',
    status: TaskStatuses.FIRST,
  },
  {
    id: 2,
    title: 'Design a new app feature',
    description: 'Sketch and prototype the upcoming chat integration feature',
    status: TaskStatuses.SECOND,
  },
  {
    id: 3,
    title: 'Write a fantasy novel',
    description: 'Complete the outline for the first three chapters of the book',
    status: TaskStatuses.FIRST,
  },
  {
    id: 4,
    title: 'Cook a new recipe',
    description: 'Try making a homemade sushi platter',
    status: TaskStatuses.SECOND,
  },
  {
    id: 5,
    title: 'Plan the weekend getaway',
    description: 'Organize a camping trip to the nearby national park',
    status: TaskStatuses.FIRST,
  },
  {
    id: 6,
    title: 'Host a gaming night',
    description: 'Set up multiplayer games and invite friends for an epic evening',
    status: TaskStatuses.SECOND,
  },
  {
    id: 7,
    title: 'Launch a community event',
    description: 'Coordinate a neighborhood cleanup and picnic',
    status: TaskStatuses.FIRST,
  },
  {
    id: 8,
    title: 'Build a treehouse',
    description: 'Design and construct a small treehouse in the backyard',
    status: TaskStatuses.SECOND,
  },
  {
    id: 9,
    title: 'Learn a new language',
    description: 'Start learning basic conversational phrases in Japanese',
    status: TaskStatuses.FIRST,
  },
  {
    id: 10,
    title: 'Organize a movie marathon',
    description: 'Select a list of classic sci-fi films and plan a weekend marathon',
    status: TaskStatuses.SECOND,
  },
];

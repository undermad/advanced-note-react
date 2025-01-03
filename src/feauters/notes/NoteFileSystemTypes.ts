import {v4 as uuidv4 } from 'uuid';

export enum NoteFileSystemType {
  NOTE = 'Note',
  FOLDER = 'FOLDER'
}

export type NoteType = {
  id: string,
  type: NoteFileSystemType.NOTE,
  name: string,
  description: string,
  body: string,
}

export type FolderType = {
  id: string,
  type: NoteFileSystemType.FOLDER,
  name: string,
  children: Array<FolderType | NoteType>
}


export const fakeFiles: FolderType = {
  id: uuidv4(),
  type: NoteFileSystemType.FOLDER,
  name: "Root",
  children: [
    {
      id: uuidv4(),
      type: NoteFileSystemType.FOLDER,
      name: "Work Projects",
      children: [
        {
          id: uuidv4(),
          type: NoteFileSystemType.FOLDER,
          name: "Meeting Notes",
          children: [
            {
              id: uuidv4(),
              type: NoteFileSystemType.FOLDER,
              name: "Quarterly Reviews",
              children: [
                {
                  id: uuidv4(),
                  type: NoteFileSystemType.NOTE,
                  name: "Q1 Review",
                  description: "Notes from the Q1 review meeting",
                  body: "Discussed performance and goals for Q2.",
                },
                {
                  id: uuidv4(),
                  type: NoteFileSystemType.NOTE,
                  name: "Q2 Review",
                  description: "Notes from the Q2 review meeting",
                  body: "Reviewed team achievements and set objectives for Q3.",
                },
              ],
            },
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "Team Sync - Feb 2025",
              description: "Team Sync - Feb 2025",
              body: "Updated sprint timelines and tasks.",
            },
          ],
        },
        {
          id: uuidv4(),
          type: NoteFileSystemType.FOLDER,
          name: "Design Documents",
          children: [
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "UI Mockups",
              description: "UI Mockups",
              body: "Initial mockups for the product dashboard.",
            },
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "UX Guidelines",
              description: "UX Guidelines",
              body: "Principles for a user-friendly interface.",
            },
          ],
        },
        {
          id: uuidv4(),
          type: NoteFileSystemType.NOTE,
          name: "Project Beta Proposal",
          description: "Project Beta Proposal",
          body: "Proposal document for Beta initiative.",
        },
      ],
    },
    {
      id: uuidv4(),
      type: NoteFileSystemType.FOLDER,
      name: "Personal",
      children: [
        {
          id: uuidv4(),
          type: NoteFileSystemType.FOLDER,
          name: "Health and Fitness",
          children: [
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "Workout Plan",
              description: "Workout Plan",
              body: "Weekly workout schedule for strength and cardio.",
            },
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "Diet Plan",
              description: "Diet Plan",
              body: "Meal plans for healthy eating.",
            },
          ],
        },
        {
          id: uuidv4(),
          type: NoteFileSystemType.FOLDER,
          name: "Travel Plans",
          children: [
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "Winter Trip Itinerary",
              description: "Winter Trip Itinerary",
              body: "Day 1: Skiing, Day 2: Snowboarding, Day 3: City exploration.",
            },
            {
              id: uuidv4(),
              type: NoteFileSystemType.NOTE,
              name: "Packing Checklist",
              description: "Packing Checklist",
              body: "Warm clothes, boots, gloves, travel documents.",
            },
          ],
        },
        {
          id: uuidv4(),
          type: NoteFileSystemType.NOTE,
          name: "Books to Read",
          description: "Books to Read",
          body: "List of recommended books for personal development.",
        },
      ],
    },
    {
      id: uuidv4(),
      type: NoteFileSystemType.NOTE,
      name: "Welcome Note",
      description: "Welcome Note",
      body: "This is the root folder. Organize your notes and folders here!",
    },
  ],
};


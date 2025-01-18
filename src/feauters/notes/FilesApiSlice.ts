import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FileNode, FileTreeNode } from "./NoteFileSystemTypes.ts";
import {
  assignDepthAndParent,
  collapseChildren,
  mapFilesToTreeNodes,
  sortFolderThenFileAlphabetically,
  unCollapseChildren
} from "./Utils.ts";
import { AppDispatch } from "../../state/State.ts";


const URL = "http://localhost:8080/api/v1";

export const filesApiSlice = createApi({
  reducerPath: "filesApi",
  tagTypes: ["files"],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getFiles: builder.query<FileTreeNode[], { rootId: string }>({
      query: ({ rootId }) => `/files/${rootId}`,
      transformResponse: (rawResult) => {
        return sortFolderThenFileAlphabetically(mapFilesToTreeNodes(rawResult as FileNode[]));
      },
      providesTags: ["files"]
    }),

    updateFiles: builder.mutation<string, { files: FileNode[] }>({
      query: ({ files }) => ({
        url: "/files",
        method: "PATCH",
        body: { files: files }
      }),
      
      //change this call to be moveFolders instead of simple patch
      //this way you can extract the active, over etc to perform state update accordingly
      //fix bug that keep nodes visible after dropping them into collapsed folder
      onQueryStarted: async ({ files }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          filesApiSlice.util.updateQueryData(
            "getFiles",
            { rootId: files[0].rootId },
            (draft) => {
              const idMap = new Map<string, FileTreeNode>(draft.map(file => [file.id, file]));
              files.forEach(updatedFile => {
                const fileToUpdate = idMap.get(updatedFile.id)!;
                Object.assign(fileToUpdate, updatedFile);
              });
              assignDepthAndParent(files[0].rootId, 0, idMap);
              const updatedState = sortFolderThenFileAlphabetically(Array.from(idMap.values()));
              draft.splice(0, draft.length, ...updatedState);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch(error){
          console.log(error)
          patchResult.undo();
        }
      }
    })


  })
});

export const clientFilesAction = {
  collapseFolder: (dispatch: AppDispatch, folderId: string, rootId: string) => {
    dispatch(
      filesApiSlice.util.updateQueryData("getFiles", { rootId: rootId }, (draft) => {
        const updatedState = collapseChildren(folderId, draft)!;
        draft.splice(0, draft.length, ...updatedState);
      })
    );
  },
  unCollapseFolder: (dispatch: AppDispatch, folderId: string, rootId: string) => {
    dispatch(
      filesApiSlice.util.updateQueryData("getFiles", { rootId: rootId }, (draft) => {
        const updatedState = unCollapseChildren(folderId, draft);
        draft.splice(0, draft.length, ...updatedState);
      })
    );
  }


};


export const { useGetFilesQuery, useUpdateFilesMutation } = filesApiSlice;
import { AUDIOBOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

export const audiobooksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAudiobooks: builder.query({
            query: () => ({
                url: AUDIOBOOKS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getAudiobookDetail: builder.query({
            query: (audiobookId) => ({
                url: `${AUDIOBOOKS_URL}/${audiobookId}`
            }),
            keepUnusedDataFor: 5
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${AUDIOBOOKS_URL}/${data.audiobookId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const { useGetAudiobooksQuery, useGetAudiobookDetailQuery, useCreateReviewMutation } = audiobooksApiSlice
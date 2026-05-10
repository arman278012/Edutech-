import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courses: [],
    loading: false,
    error: null,

    search: "",
    category: "",
    sortBy: "",

    page: 1,
    limit: 4,
    total: 0,
    hasMore: true,
}

const courseSlice = createSlice({
    name: "courses",
    initialState,

    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload
        },

        addCourses: (state, action) => {
            state.courses = [...state.courses, ...action.payload]
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setSearch: (state, action) => {
            state.search = action.payload
        },

        setCategory: (state, action) => {
            state.category = action.payload
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        setTotal: (state, action) => {
            state.total = action.payload
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        resetCourses: (state) => {
            state.courses = []
            state.page = 1
            state.hasMore = true
        },
    },
})

export const {
    setCourses,
    addCourses,
    setLoading,
    setError,
    setSearch,
    setCategory,
    setSortBy,
    setPage,
    setTotal,
    setHasMore,
    resetCourses,
} = courseSlice.actions

export default courseSlice.reducer
import axios from "axios"

const BASE_URL = "https://edutech-backend-1-z9lt.onrender.com/api/courses"

// GET ALL COURSES
export const fetchCourses = async ({
    page = 1,
    limit = 8,
    search = "",
    category = "",
    sort = "",
}) => {
    const response = await axios.get(BASE_URL, {
        params: {
            page,
            limit,
            search,
            category,
            sort,
        },
    })

    return response.data
}

// GET SINGLE COURSE
export const fetchCourseById = async (id) => {
    const response = await axios.get(
        `${BASE_URL}/${id}`
    )

    return response.data
}

// GET CATEGORIES
export const fetchCategories = async () => {
    const response = await axios.get(
        `${BASE_URL}/categories`
    )

    return response.data
}
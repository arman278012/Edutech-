import axios from "axios"

const BASE_URL = "http://localhost:5000/api/courses"

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
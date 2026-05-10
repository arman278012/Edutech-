import { useEffect, useMemo } from "react"

import { useDispatch, useSelector } from "react-redux"

import { useInView } from "react-intersection-observer"

import {
    addCourses,
    setLoading,
    setError,
    setPage,
    setTotal,
    setHasMore,
    resetCourses,
} from "../redux/courseSlice"

import { fetchCourses } from "../api/courseApi"

import CourseCard from "../components/CourseCard"
import Loader from "../components/Loader"
import Filters from "../components/Filters"

import useDebounce from "../hooks/useDebounce"

const Home = () => {
    const dispatch = useDispatch()

    const {
        courses,
        loading,
        error,
        page,
        limit,
        search,
        category,
        sortBy,
        hasMore,
    } = useSelector((state) => state.courses)

    // DEBOUNCED SEARCH
    const debouncedSearch = useDebounce(search, 700)

    const { ref, inView } = useInView()

    // FETCH COURSES
    const loadCourses = async () => {
        try {
            dispatch(setLoading(true))

            const data = await fetchCourses({
                page,
                limit,
                search: debouncedSearch,
                category,
                sort: sortBy,
            })

            // PAGE 1 => REPLACE
            if (page === 1) {
                dispatch(resetCourses())
            }

            // PREVENT DUPLICATE DATA
            const uniqueCourses = data.courses.filter(
                (newCourse) =>
                    !courses.some(
                        (existingCourse) =>
                            existingCourse._id === newCourse._id
                    )
            )

            dispatch(addCourses(uniqueCourses))

            dispatch(setTotal(data.total))

            // CHECK MORE DATA
            const totalLoadedCourses =
                courses.length + uniqueCourses.length

            if (totalLoadedCourses >= data.total) {
                dispatch(setHasMore(false))
            } else {
                dispatch(setHasMore(true))
            }

            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setError("Failed to fetch courses"))

            dispatch(setLoading(false))
        }
    }

    // FETCH DATA
    useEffect(() => {
        loadCourses()
    }, [
        page,
        debouncedSearch,
        category,
        sortBy,
    ])

    // RESET WHEN FILTERS CHANGE
    useEffect(() => {
        dispatch(resetCourses())

        dispatch(setPage(1))
    }, [debouncedSearch, category, sortBy])


    // INFINITE SCROLL
    useEffect(() => {
        if (
            inView &&
            hasMore &&
            !loading &&
            courses.length > 0
        ) {
            dispatch(setPage(page + 1))
        }
    }, [inView])

    // LOCAL SORTING
    const sortedCourses = useMemo(() => {
        let updatedCourses = [...courses]

        if (sortBy === "title") {
            updatedCourses.sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        }

        if (sortBy === "rating") {
            updatedCourses.sort(
                (a, b) => b.rating - a.rating
            )
        }

        return updatedCourses
    }, [courses, sortBy])

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #0a0a14 0%, #0f0f1a 50%, #0a0e1a 100%)",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "48px 24px",
                }}
            >

                {/* HEADER */}
                <div style={{ marginBottom: "48px" }}>

                    <div
                        style={{
                            display: "inline-block",
                            background:
                                "rgba(251,191,36,0.1)",
                            border:
                                "1px solid rgba(251,191,36,0.3)",
                            borderRadius: "20px",
                            padding: "6px 16px",
                            marginBottom: "16px",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "monospace",
                                fontSize: "0.7rem",
                                letterSpacing: "0.15em",
                                color: "#fbbf24",
                                textTransform: "uppercase",
                            }}
                        >
                            ✦ 500+ Expert Courses
                        </span>
                    </div>

                    <h1
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize:
                                "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: "700",
                            color: "#f8fafc",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.15,
                            marginBottom: "12px",
                        }}
                    >
                        Explore{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, #fbbf24, #f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor:
                                    "transparent",
                            }}
                        >
                            Courses
                        </span>
                    </h1>

                    <p
                        style={{
                            color:
                                "rgba(248,250,252,0.4)",
                            fontSize: "1rem",
                            maxWidth: "480px",
                        }}
                    >
                        Master new skills with
                        world-class instructors.
                        Learn at your own pace.
                    </p>
                </div>

                <Filters />

                {/* ERROR */}
                {error && (
                    <div
                        style={{
                            background:
                                "rgba(239,68,68,0.1)",
                            border:
                                "1px solid rgba(239,68,68,0.3)",
                            borderRadius: "12px",
                            padding: "12px 20px",
                            color: "#fca5a5",
                            marginBottom: "24px",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    sortedCourses.length === 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "80px 20px",
                                color:
                                    "rgba(248,250,252,0.3)",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "3rem",
                                    marginBottom: "16px",
                                }}
                            >
                                🔍
                            </div>

                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    fontFamily:
                                        "'Georgia', serif",
                                }}
                            >
                                No courses found
                            </p>
                        </div>
                    )}

                {/* GRID */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(270px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {sortedCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                        />
                    ))}
                </div>

                {/* LOADER */}
                {loading && <Loader />}

                {/* END */}
                {!hasMore &&
                    courses.length > 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "48px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    height: "1px",
                                    width: "60px",
                                    background:
                                        "rgba(255,255,255,0.1)",
                                }}
                            />

                            <span
                                style={{
                                    color:
                                        "rgba(248,250,252,0.3)",
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                YOU'VE SEEN IT ALL
                            </span>

                            <div
                                style={{
                                    height: "1px",
                                    width: "60px",
                                    background:
                                        "rgba(255,255,255,0.1)",
                                }}
                            />
                        </div>
                    )}

                {/* OBSERVER */}
                {hasMore && (
                    <div
                        ref={ref}
                        style={{ height: "40px" }}
                    />
                )}
            </div>
        </div>
    )
}

export default Home
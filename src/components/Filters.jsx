import { useDispatch, useSelector } from "react-redux"
import { setSearch, setCategory, setSortBy } from "../redux/courseSlice"
import { fetchCategories } from "../api/courseApi"
import { useEffect, useState } from "react"
import { FiSearch, FiGrid, FiTrendingUp } from "react-icons/fi"

const selectStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#f8fafc",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    cursor: "pointer",
    appearance: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
}

const Filters = () => {
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const { search, category, sortBy } = useSelector((state) => state.courses)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories()
                setCategories(data || [])
            } catch (error) {
                console.log(error)
            }
        }
        loadCategories()
    }, [])

    const focusStyle = (e) => {
        e.target.style.borderColor = "rgba(251,191,36,0.6)"
        e.target.style.boxShadow = "0 0 0 3px rgba(251,191,36,0.1)"
    }
    const blurStyle = (e) => {
        e.target.style.borderColor = "rgba(255,255,255,0.1)"
        e.target.style.boxShadow = "none"
    }

    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "40px",
            backdropFilter: "blur(10px)",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
            }}>
                {/* Search */}
                <div style={{ position: "relative" }}>
                    <FiSearch style={{
                        position: "absolute", left: "14px", top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(251,191,36,0.6)", fontSize: "1rem",
                        pointerEvents: "none",
                    }} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        style={{
                            ...selectStyle,
                            paddingLeft: "42px",
                        }}
                    />
                </div>

                {/* Category */}
                <div style={{ position: "relative" }}>
                    <FiGrid style={{
                        position: "absolute", left: "14px", top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(251,191,36,0.6)", fontSize: "1rem",
                        pointerEvents: "none", zIndex: 1,
                    }} />
                    <select
                        value={category}
                        onChange={(e) => dispatch(setCategory(e.target.value))}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        style={{ ...selectStyle, paddingLeft: "42px" }}
                    >
                        <option value="" style={{ background: "#1a1a2e" }}>All Categories</option>
                        {categories?.map((cat) => (
                            <option key={cat} value={cat} style={{ background: "#1a1a2e" }}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div style={{ position: "relative" }}>
                    <FiTrendingUp style={{
                        position: "absolute", left: "14px", top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(251,191,36,0.6)", fontSize: "1rem",
                        pointerEvents: "none", zIndex: 1,
                    }} />
                    <select
                        value={sortBy}
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                        style={{ ...selectStyle, paddingLeft: "42px" }}
                    >
                        <option value="" style={{ background: "#1a1a2e" }}>Sort By</option>
                        <option value="title" style={{ background: "#1a1a2e" }}>Course Name</option>
                        <option value="rating" style={{ background: "#1a1a2e" }}>Rating</option>
                        <option value="priceLow" style={{ background: "#1a1a2e" }}>Price: Low → High</option>
                        <option value="priceHigh" style={{ background: "#1a1a2e" }}>Price: High → Low</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filters
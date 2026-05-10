import { FaStar } from "react-icons/fa"
import { FiClock, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useState } from "react"

const CourseCard = ({ course }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <Link
            to={`/course/${course?._id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "block",
                background: hovered
                    ? "linear-gradient(135deg, #1e1e35, #16213e)"
                    : "linear-gradient(135deg, #16213e, #0f0f1a)",
                border: hovered
                    ? "1px solid rgba(251,191,36,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                overflow: "hidden",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered
                    ? "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.1)"
                    : "0 4px 16px rgba(0,0,0,0.2)",
            }}
        >
            {/* Thumbnail */}
            <div style={{ position: "relative", overflow: "hidden", height: "180px" }}>
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        transition: "transform 0.4s ease",
                        transform: hovered ? "scale(1.07)" : "scale(1)",
                    }}
                />
                {/* Overlay gradient */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(15,15,26,0.8) 0%, transparent 60%)",
                }} />
                {/* Category badge */}
                <span style={{
                    position: "absolute", top: "12px", left: "12px",
                    background: "rgba(251,191,36,0.15)",
                    border: "1px solid rgba(251,191,36,0.4)",
                    color: "#fbbf24",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    backdropFilter: "blur(8px)",
                }}>
                    {course.category}
                </span>
                {/* Rating overlay */}
                <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "10px",
                    padding: "4px 10px",
                    display: "flex", alignItems: "center", gap: "5px",
                }}>
                    <FaStar style={{ color: "#fbbf24", fontSize: "0.75rem" }} />
                    <span style={{ color: "#fbbf24", fontWeight: "700", fontSize: "0.8rem" }}>
                        {course.rating}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "18px" }}>
                <h2 style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#f8fafc",
                    lineHeight: "1.4",
                    marginBottom: "10px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    letterSpacing: "-0.01em",
                }}>
                    {course.title}
                </h2>

                {/* Instructor */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    marginBottom: "14px",
                }}>
                    <FiUser style={{ color: "rgba(251,191,36,0.5)", fontSize: "0.8rem" }} />
                    <span style={{
                        color: "rgba(248,250,252,0.5)",
                        fontSize: "0.78rem",
                        letterSpacing: "0.01em",
                    }}>
                        {course.instructor}
                    </span>
                </div>

                {/* Duration */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    marginBottom: "18px",
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}>
                    <FiClock style={{ color: "rgba(251,191,36,0.6)", fontSize: "0.8rem" }} />
                    <span style={{ color: "rgba(248,250,252,0.6)", fontSize: "0.78rem" }}>
                        {course.stock} weeks · Self-paced
                    </span>
                </div>

                {/* CTA */}
                <button style={{
                    width: "100%",
                    padding: "11px",
                    background: hovered
                        ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                        : "rgba(251,191,36,0.1)",
                    border: "1px solid rgba(251,191,36,0.4)",
                    borderRadius: "12px",
                    color: hovered ? "#0f0f1a" : "#fbbf24",
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                }}>
                    Enroll Now →
                </button>
            </div>
        </Link>
    )
}

export default CourseCard
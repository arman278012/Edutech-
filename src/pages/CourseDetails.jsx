import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../redux/cartSlice"
import { fetchCourseById } from "../api/courseApi"
import { FaStar } from "react-icons/fa"
import { FiClock, FiUser, FiTag, FiArrowLeft } from "react-icons/fi"

import CartButton from "../components/CourseDetails/CartButton"
import SyllabusItem from "../components/CourseDetails/SyllabusItem"
import CourseDetailsSkeleton from "../components/CourseDetails/CourseDetailsSkeleton"

const CourseDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        const getCourse = async () => {
            try {
                setLoading(true)
                const data = await fetchCourseById(id)
                setCourse(data.course || data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        if (id) getCourse()
    }, [id])

    if (loading) return <CourseDetailsSkeleton type="loading" />
    if (!course) return <CourseDetailsSkeleton type="error" />

    const isInCart = cartItems.some((item) => item._id === course._id)

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a14 0%, #0f0f1a 50%, #0a0e1a 100%)",
        }}>

            {/* ── Blurred hero banner ── */}
            <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                <img
                    src={course.thumbnail}
                    alt=""
                    style={{
                        width: "100%", height: "100%", objectFit: "cover",
                        filter: "blur(18px) brightness(0.25) saturate(1.4)",
                        transform: "scale(1.1)",
                    }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, #0f0f1a 100%)",
                }} />
            </div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 64px" }}>

                {/* Back link */}
                <Link
                    to="/"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        color: "rgba(248,250,252,0.4)", fontSize: "0.78rem",
                        textDecoration: "none", letterSpacing: "0.08em",
                        marginBottom: "24px",
                        transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(248,250,252,0.4)"}
                >
                    <FiArrowLeft /> BACK TO COURSES
                </Link>

                {/* ── Main card pulled up over hero ── */}
                <div style={{
                    marginTop: "-120px",
                    background: "linear-gradient(160deg, #16213e 0%, #0f0f1a 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "28px",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                }}>

                    {/* LEFT — image panel */}
                    <div style={{ position: "relative", minHeight: "520px", overflow: "hidden" }}>
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            onLoad={() => setImgLoaded(true)}
                            style={{
                                width: "100%", height: "100%", objectFit: "cover",
                                transition: "opacity 0.6s ease",
                                opacity: imgLoaded ? 1 : 0,
                                display: "block",
                            }}
                        />
                        {/* Gradient fade right edge into card */}
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to right, transparent 50%, #0f0f1a 100%)",
                        }} />

                        {/* Price badge */}
                        <div style={{
                            position: "absolute", bottom: "28px", left: "24px",
                            background: "rgba(10,10,20,0.88)",
                            border: "1px solid rgba(251,191,36,0.4)",
                            borderRadius: "16px",
                            padding: "12px 22px",
                            backdropFilter: "blur(12px)",
                        }}>
                            <p style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "1.75rem", fontWeight: "700",
                                color: "#fbbf24", letterSpacing: "-0.02em",
                                lineHeight: 1,
                            }}>
                                ₹{course.price}
                            </p>
                            <p style={{
                                color: "rgba(248,250,252,0.35)",
                                fontSize: "0.65rem", letterSpacing: "0.12em",
                                marginTop: "4px",
                            }}>
                                ONE-TIME PAYMENT
                            </p>
                        </div>
                    </div>

                    {/* RIGHT — details panel */}
                    <div style={{
                        padding: "44px 40px 44px 32px",
                        overflowY: "auto",
                        maxHeight: "700px",
                        // custom scrollbar
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(251,191,36,0.2) transparent",
                    }}>

                        {/* Category */}
                        <span style={{
                            display: "inline-block",
                            background: "rgba(251,191,36,0.1)",
                            border: "1px solid rgba(251,191,36,0.35)",
                            color: "#fbbf24",
                            fontSize: "0.63rem", fontWeight: "700",
                            letterSpacing: "0.15em", textTransform: "uppercase",
                            padding: "5px 14px", borderRadius: "20px",
                            marginBottom: "18px",
                        }}>
                            {course.category}
                        </span>

                        {/* Title — now fully visible, no overlap */}
                        <h1 style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                            fontWeight: "700",
                            color: "#f8fafc",
                            letterSpacing: "-0.025em",
                            lineHeight: "1.25",
                            marginBottom: "22px",
                        }}>
                            {course.title}
                        </h1>

                        {/* Meta row */}
                        <div style={{
                            display: "flex", alignItems: "center",
                            gap: "16px", flexWrap: "wrap",
                            marginBottom: "22px",
                        }}>
                            <MetaPill icon={<FiUser />} label={course.instructor} />
                            <MetaPill icon={<FaStar style={{ color: "#fbbf24" }} />} label={course.rating} highlight />
                            <MetaPill icon={<FiClock />} label={course.duration} />
                        </div>

                        <Divider />

                        {/* Description */}
                        <p style={{
                            color: "rgba(248,250,252,0.58)",
                            fontSize: "0.88rem", lineHeight: "1.85",
                            marginBottom: "26px",
                        }}>
                            {course.description}
                        </p>

                        {/* Tags */}
                        {course.tags?.length > 0 && (
                            <div style={{ marginBottom: "26px" }}>
                                <SectionLabel icon={<FiTag />} text="Topics" />
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                                    {course.tags.map((tag, i) => (
                                        <span key={i} style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "rgba(248,250,252,0.55)",
                                            padding: "4px 13px", borderRadius: "20px",
                                            fontSize: "0.75rem", letterSpacing: "0.03em",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cart CTA */}
                        <CartButton
                            isInCart={isInCart}
                            onAdd={() => dispatch(addToCart(course))}
                            onRemove={() => dispatch(removeFromCart(course._id))}
                        />

                        {/* Syllabus */}
                        {course.syllabus?.length > 0 && (
                            <div style={{ marginTop: "36px" }}>
                                <div style={{
                                    display: "flex", alignItems: "center",
                                    gap: "10px", marginBottom: "14px",
                                }}>
                                    <h2 style={{
                                        fontFamily: "'Georgia', serif",
                                        fontSize: "1.05rem", fontWeight: "700",
                                        color: "#f8fafc",
                                    }}>
                                        Course Syllabus
                                    </h2>
                                    <span style={{
                                        background: "rgba(251,191,36,0.1)",
                                        border: "1px solid rgba(251,191,36,0.25)",
                                        color: "#fbbf24",
                                        fontSize: "0.62rem", fontWeight: "700",
                                        padding: "2px 9px", borderRadius: "10px",
                                    }}>
                                        {course.syllabus.length} modules
                                    </span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {course.syllabus.map((item, i) => (
                                        <SyllabusItem key={i} index={i} item={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}

/* ── Tiny inline helpers (too small to split into files) ── */

const MetaPill = ({ icon, label, highlight }) => (
    <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        background: highlight ? "rgba(251,191,36,0.08)" : "transparent",
        border: highlight ? "1px solid rgba(251,191,36,0.2)" : "none",
        borderRadius: "8px",
        padding: highlight ? "4px 10px" : "0",
    }}>
        <span style={{ color: highlight ? "#fbbf24" : "rgba(251,191,36,0.5)", fontSize: "0.8rem" }}>
            {icon}
        </span>
        <span style={{
            color: highlight ? "#fbbf24" : "rgba(248,250,252,0.5)",
            fontSize: "0.82rem", fontWeight: highlight ? "700" : "400",
        }}>
            {label}
        </span>
    </div>
)

const Divider = () => (
    <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "22px" }} />
)

const SectionLabel = ({ icon, text }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "rgba(251,191,36,0.5)", fontSize: "0.8rem" }}>{icon}</span>
        <span style={{ color: "rgba(248,250,252,0.3)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {text}
        </span>
    </div>
)

export default CourseDetails
import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from "react-redux"

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart)

    return (
        <nav style={{
            background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
            borderBottom: "1px solid rgba(251, 191, 36, 0.15)",
            padding: "0 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(12px)",
        }}>
            <div style={{
                maxWidth: "1280px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "68px",
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "32px", height: "32px",
                        background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", fontWeight: "900", color: "#0f0f1a",
                        boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
                    }}>C</div>
                    <span style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "1.4rem",
                        fontWeight: "700",
                        letterSpacing: "-0.02em",
                        color: "#f8fafc",
                    }}>
                        Course<span style={{ color: "#fbbf24" }}>Hub</span>
                    </span>
                </div>

                {/* Tagline - center */}
                <span style={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "rgba(251,191,36,0.5)",
                    textTransform: "uppercase",
                    display: "none", // hide on small, show via media query manually
                }}>
                    LEARN · GROW · EXCEL
                </span>

                {/* Cart */}
                <div style={{ position: "relative", cursor: "pointer" }}>
                    <div style={{
                        background: "rgba(251,191,36,0.1)",
                        border: "1px solid rgba(251,191,36,0.3)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        display: "flex", alignItems: "center", gap: "8px",
                        transition: "all 0.2s",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(251,191,36,0.2)"
                            e.currentTarget.style.borderColor = "rgba(251,191,36,0.6)"
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(251,191,36,0.1)"
                            e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"
                        }}
                    >
                        <FaShoppingCart style={{ color: "#fbbf24", fontSize: "1rem" }} />
                        <span style={{
                            background: "#fbbf24",
                            color: "#0f0f1a",
                            fontSize: "0.7rem",
                            fontWeight: "800",
                            width: "18px", height: "18px",
                            borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            {cartItems.length}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
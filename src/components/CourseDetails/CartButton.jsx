import { useState } from "react"
import { FiShoppingCart, FiTrash2 } from "react-icons/fi"

const CartButton = ({ isInCart, onAdd, onRemove }) => {
    const [hovered, setHovered] = useState(false)

    return isInCart ? (
        <button
            onClick={onRemove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: "100%",
                padding: "14px",
                background: hovered ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "14px",
                color: "#fca5a5",
                fontWeight: "700",
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.25s ease",
            }}
        >
            <FiTrash2 style={{ fontSize: "1rem" }} />
            Remove From Cart
        </button>
    ) : (
        <button
            onClick={onAdd}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: "100%",
                padding: "14px",
                background: hovered
                    ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                    : "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.45)",
                borderRadius: "14px",
                color: hovered ? "#0f0f1a" : "#fbbf24",
                fontWeight: "700",
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.25s ease",
                boxShadow: hovered ? "0 8px 24px rgba(251,191,36,0.25)" : "none",
            }}
        >
            <FiShoppingCart style={{ fontSize: "1rem" }} />
            Add To Cart
        </button>
    )
}

export default CartButton
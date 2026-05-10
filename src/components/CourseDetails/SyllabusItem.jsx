import { useState } from "react"

const SyllabusItem = ({ index, item }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "12px 14px",
                background: hovered ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.03)",
                border: hovered
                    ? "1px solid rgba(251,191,36,0.2)"
                    : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                transition: "all 0.2s ease",
                cursor: "default",
            }}
        >
            <span style={{
                minWidth: "26px",
                height: "26px",
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.25)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbbf24",
                fontSize: "0.65rem",
                fontWeight: "800",
                fontFamily: "monospace",
                flexShrink: 0,
            }}>
                {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{
                color: "rgba(248,250,252,0.7)",
                fontSize: "0.85rem",
                lineHeight: "1.7",
                paddingTop: "3px",
            }}>
                {item}
            </span>
        </div>
    )
}

export default SyllabusItem
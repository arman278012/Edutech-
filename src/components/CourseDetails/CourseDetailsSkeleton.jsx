const CourseDetailsSkeleton = ({ type }) => {
    if (type === "error") {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a0a14, #0f0f1a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "3rem", marginBottom: "16px" }}>⚠️</p>
                    <p style={{
                        color: "#fca5a5",
                        fontFamily: "'Georgia', serif",
                        fontSize: "1.3rem",
                    }}>
                        Course not found
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a14, #0f0f1a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    border: "3px solid rgba(251,191,36,0.15)",
                    borderTop: "3px solid #fbbf24",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    animation: "spin 0.8s linear infinite",
                }} />
                <p style={{
                    color: "rgba(248,250,252,0.4)",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    fontSize: "0.8rem",
                }}>
                    LOADING COURSE...
                </p>
            </div>
        </div>
    )
}

export default CourseDetailsSkeleton
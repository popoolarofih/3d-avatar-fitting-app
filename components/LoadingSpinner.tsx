"use client"

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 10,
        borderRadius: "inherit",
      }}
    >
      <div
        style={{
          border: "4px solid rgba(0, 0, 0, 0.1)",
          borderTopColor: "#5c6bc0",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          animation: "spin 1s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <p style={{ marginTop: "16px", fontWeight: 500 }}>Loading 3D Model...</p>
    </div>
  )
}

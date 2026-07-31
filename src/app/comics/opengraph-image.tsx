import { ImageResponse } from "next/og";

export const alt = "Comics & Fiction: Spider-Man, Superman and He-Man—three ways to keep going";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const branches = [
  ["01", "Spider-Man", "Responsibility"],
  ["02", "Superman", "Hope"],
  ["03", "He-Man", "Courage"],
] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "66px 72px 58px",
        color: "#ffffff",
        background: "linear-gradient(135deg, #030915 0%, #071a36 54%, #111827 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -210,
          right: -150,
          display: "flex",
          width: 520,
          height: 520,
          border: "2px solid rgba(255,255,255,0.14)",
          borderRadius: 9999,
          boxShadow: "0 0 0 70px rgba(220,38,38,0.08), 0 0 0 140px rgba(255,255,255,0.02)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#fde047",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex", width: 48, height: 3, background: "#fde047" }} />
          Comics &amp; Fiction
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 930,
            marginTop: 24,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          Three ways to keep going.
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {branches.map(([number, name, theme]) => (
          <div
            key={name}
            style={{
              display: "flex",
              width: 330,
              flexDirection: "column",
              padding: "20px 22px",
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(3,9,21,0.42)",
            }}
          >
            <span style={{ color: "#f87171", fontSize: 17, fontWeight: 700 }}>{number}</span>
            <span style={{ marginTop: 13, fontSize: 30, fontWeight: 800 }}>{name}</span>
            <span style={{ marginTop: 7, color: "#bfdbfe", fontSize: 17 }}>{theme}</span>
          </div>
        ))}
      </div>
    </div>,
    size
  );
}

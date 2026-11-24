import { ImageResponse } from "next/og";

/** Shared 1200×630 share card for Learning Lab pages (WhatsApp, LinkedIn, X). Built at build time. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function labShareCard(title: string, subtitle: string, tags: readonly string[]) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f4ed",
          color: "#20293c",
        }}
      >
        <div style={{ width: 24, height: "100%", background: "#35459d", display: "flex" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              color: "#35459d",
              textTransform: "uppercase",
            }}
          >
            Swapnil Sahoo Learning Lab
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
              {title}
            </div>
            <div style={{ display: "flex", fontSize: 32, marginTop: 28, color: "#535d6c" }}>
              {subtitle}
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  padding: "10px 20px",
                  border: "2px solid #35459d",
                  color: "#35459d",
                  borderRadius: 6,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}

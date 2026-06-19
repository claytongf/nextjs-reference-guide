import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#ededed",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: 34,
          color: "#818cf8",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "#818cf8",
          }}
        />
        React &amp; Next.js
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 28,
          letterSpacing: "-0.02em",
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "#a1a1aa",
          marginTop: 28,
          maxWidth: 900,
        }}
      >
        Searchable docs, study tracks, and knowledge tests — from Junior to Tech
        Lead.
      </div>
    </div>,
    { ...size },
  );
}

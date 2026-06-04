import * as React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        border: 0,
        borderRadius: 14,
        padding: "12px 18px",
        fontWeight: 700,
        cursor: "pointer",
        background: "#16A34A",
        color: "#FFFFFF",
        ...props.style
      }}
    />
  );
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 18,
        padding: 20,
        background: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        ...props.style
      }}
    />
  );
}

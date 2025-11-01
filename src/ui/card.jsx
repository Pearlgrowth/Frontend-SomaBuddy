import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-4 border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

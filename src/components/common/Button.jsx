import React, { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import clsx from "clsx";
export default function Button({
  children,
  onClick = () => { },
  type = "button",
  size = "medium",
  text = "",
  disabled = false,
  variant = "primary",
  className = "",
  prefix = null,
  suffix = null,
  isLoading = false,
  loadingPosition = "right",
  spanClassName = "",
  suffixClassName = "",
  ...props
}) {
  const buttonRef = useRef(null);
  const handleClick = (e) => {
    onClick(e); // Direkt butonu çalıştır
  };

  // Temel buton stilleri
  const baseStyles =
    "relative font-semibold rounded-[8px] focus:outline-none focus:ring-2 focus:ring-offset-2 text-[13px] ";

  // Buton stilleri
  const variants = {
    primary: "bg-black text-white focus:ring-black-500",
    secondary: "bg-orange text-white  focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  // Buton boyutları
  const sizes = {
    xsmall: "px-1 py-1 text-sm",
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-5 py-3 text-lg",
  };

  // Bileşen CSS sınıfları
  const combinedClasses = `
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.medium}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
        hover:shadow-md hover:-translate-y-1 transition-all duration-200
    `;

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      <span className={clsx("flex items-center justify-center gap-2 relative whitespace-nowrap", spanClassName)}>
        {prefix && <span className={`${text || children ? "mr-2" : "mr-0"}`}>{prefix}</span>}
        {children ?? text}
        {isLoading && (
          loadingPosition === "center" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ClipLoader color="#F38332" size={13} />
            </div>)
            : <ClipLoader color="currentColor" size={13} />
        )}
        {suffix && <span className={clsx(suffix ? "ml-2" : "ml-0", suffixClassName)}>{suffix}</span>}
      </span>
    </button>
  );
}

import React from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    icon,
    iconPosition = "right",
    children,
    className = "",
    disabled,
    ...props
}) => {
    // Base structural classes matching Figma auto-layout (Corner radius: 5px)
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-[5px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    // Variant Styles matching Figma specs
    const variantClasses: Record<ButtonVariant, string> = {
        primary:
            "bg-[#1C1917] text-white hover:bg-black focus:ring-gray-900 active:bg-gray-900",
        secondary:
            "bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-300 active:bg-gray-100",
    };

    // Size Options
    const sizeClasses: Record<ButtonSize, string> = {
        sm: "h-9 px-4 text-xs",
        md: "h-12 px-6 text-sm", // Default 48px height matching Figma
        lg: "h-14 px-8 text-base",
    };

    const widthClass = fullWidth ? "w-full" : "w-auto";

    return (
        <button
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <span className="mr-2 flex items-center">{icon}</span>
                    )}
                    <span>{children}</span>
                    {icon && iconPosition === "right" && (
                        <span className="ml-2 flex items-center">{icon}</span>
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
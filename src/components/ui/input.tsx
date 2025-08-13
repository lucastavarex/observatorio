import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface InputWithIconProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" ? "pl-8!" : icon && iconPosition === "right" ? "pr-8!" : "px-3",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className={cn(
            "absolute top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none",
            iconPosition === "left" ? "left-3" : "right-3"
          )}>
            {icon}
          </div>
        )}
      </div>
    )
  }
)
InputWithIcon.displayName = "InputWithIcon"

export { Input, InputWithIcon }


"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentVal = isControlled ? value : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={currentVal}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 h-10 w-full rounded-xl bg-background border-border shadow-xs focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      {currentVal && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => handleChange("")}
          className="absolute right-2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}

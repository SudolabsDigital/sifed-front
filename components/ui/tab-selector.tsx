import { cn } from "@/lib/utils";

interface TabOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabSelectorProps {
  options: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function TabSelector({
  options,
  activeTab,
  onChange,
  className,
}: TabSelectorProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2 p-1.5 bg-muted/50 rounded-2xl border border-border", className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300",
            activeTab === option.id
              ? "bg-white text-brand-700 shadow-md scale-[1.02]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/50"
          )}
        >
          {option.icon && <span className="shrink-0">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
}

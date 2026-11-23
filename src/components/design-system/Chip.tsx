import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Chip.css";

/** A small outlined label. All chips are one colour so none of them shouts. */
export function Chip({ children, to }: { children: ReactNode; to?: string }) {
  if (to) {
    return (
      <Link className="chip chip--link" to={to}>
        {children}
      </Link>
    );
  }
  return <span className="chip">{children}</span>;
}

export interface FilterPillsProps<T extends string> {
  label: string;
  options: { id: T; label: string; count?: number }[];
  value: T;
  onChange: (id: T) => void;
}

/** Outlined pills; the selected one gets the lavender fill. */
export function FilterPills<T extends string>({ label, options, value, onChange }: FilterPillsProps<T>) {
  return (
    <div className="filter-pills" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="pill"
          aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
        >
          {o.label}
          {o.count !== undefined && <span className="pill__count">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

export default Chip;

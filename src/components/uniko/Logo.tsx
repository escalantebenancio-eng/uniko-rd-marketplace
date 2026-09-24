import { Link } from "@tanstack/react-router";
import logoColor from "@/assets/uniko-logo.png.asset.json";
import logoBlanco from "@/assets/uniko-logo-blanco.png.asset.json";

export function Logo({
  variante = "color",
  className = "h-11",
}: {
  variante?: "color" | "blanco";
  className?: string;
}) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label="UNIKO-RD inicio">
      <img
        src={variante === "blanco" ? logoBlanco.url : logoColor.url}
        alt="UNIKO-RD · Marketplace Dominicano"
        className={`w-auto object-contain ${className}`}
      />
    </Link>
  );
}

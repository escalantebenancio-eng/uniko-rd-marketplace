import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TarjetaTienda } from "@/components/uniko/Tarjetas";
import { provincias, tiendas } from "@/data/marketplace";

export const Route = createFileRoute("/tiendas/")({
  head: () => ({
    meta: [
      { title: "Tiendas dominicanas · UNIKO-RD" },
      {
        name: "description",
        content:
          "Descubre tiendas y negocios dominicanos verificados con envíos a todo el país en UNIKO-RD.",
      },
      { property: "og:title", content: "Tiendas dominicanas · UNIKO-RD" },
      {
        property: "og:description",
        content: "Sigue tus negocios favoritos y compra directo a vendedores locales.",
      },
    ],
  }),
  component: Tiendas,
});

function Tiendas() {
  const [provincia, setProvincia] = useState("todas");
  const lista = tiendas.filter(
    (t) => provincia === "todas" || t.ubicacion.includes(provincia),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl">Tiendas</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Negocios dominicanos verificados · {lista.length} tiendas
      </p>

      <select
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
        className="mt-6 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
      >
        <option value="todas">Toda RD</option>
        {provincias.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lista.map((t) => (
          <TarjetaTienda key={t.id} tienda={t} />
        ))}
      </div>
    </div>
  );
}

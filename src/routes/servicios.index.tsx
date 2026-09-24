import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TarjetaServicio } from "@/components/uniko/Tarjetas";
import { categorias, provincias, servicios } from "@/data/marketplace";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios y profesionales · UNIKO-RD" },
      {
        name: "description",
        content:
          "Contrata plomeros, electricistas, diseñadores, fotógrafos y más profesionales verificados en toda República Dominicana.",
      },
      { property: "og:title", content: "Servicios y profesionales · UNIKO-RD" },
      {
        property: "og:description",
        content: "Encuentra profesionales verificados cerca de ti y pide tu cotización.",
      },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  const [categoria, setCategoria] = useState("todas");
  const [provincia, setProvincia] = useState("todas");
  const [soloVerificados, setSoloVerificados] = useState(false);
  const [orden, setOrden] = useState("relevancia");

  const lista = useMemo(() => {
    const filtrada = servicios.filter(
      (s) =>
        (categoria === "todas" || s.categoria === categoria) &&
        (provincia === "todas" || s.ubicacion.includes(provincia)) &&
        (!soloVerificados || s.verificado),
    );
    const copia = [...filtrada];
    if (orden === "precio-asc") copia.sort((a, b) => a.desde - b.desde);
    if (orden === "rating") copia.sort((a, b) => b.rating - a.rating);
    return copia;
  }, [categoria, provincia, soloVerificados, orden]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl">Servicios y profesionales</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {lista.length} servicios disponibles · Convierte tus habilidades en oportunidades
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
        >
          <option value="todas">Todas las categorías</option>
          {categorias
            .filter((c) => c.tipo !== "producto")
            .map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.nombre}
              </option>
            ))}
        </select>
        <select
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
        >
          <option value="todas">Toda RD</option>
          {provincias.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Menor precio inicial</option>
          <option value="rating">Mejor calificados</option>
        </select>
        <label className="inline-flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={soloVerificados}
            onChange={(e) => setSoloVerificados(e.target.checked)}
          />
          Profesionales verificados
        </label>
      </div>

      {lista.length ? (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {lista.map((s) => (
            <TarjetaServicio key={s.id} servicio={s} />
          ))}
        </div>
      ) : (
        <p className="card-uniko mt-6 p-8 text-center text-sm text-muted-foreground">
          No encontramos servicios con esos filtros.
        </p>
      )}
    </div>
  );
}

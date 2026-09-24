import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Users, Package } from "lucide-react";
import { productos, servicios, tiendas } from "@/data/marketplace";
import { BadgeVerificado, Estrellas, TituloSeccion } from "@/components/uniko/Primitivos";
import { TarjetaProducto, TarjetaServicio } from "@/components/uniko/Tarjetas";

export const Route = createFileRoute("/tiendas/$tiendaId")({
  loader: ({ params }) => {
    const tienda = tiendas.find((t) => t.id === params.tiendaId);
    if (!tienda) throw notFound();
    return { tienda };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tienda no encontrada · UNIKO-RD" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tienda } = loaderData;
    return {
      meta: [
        { title: `${tienda.nombre} · UNIKO-RD` },
        {
          name: "description",
          content: `${tienda.nombre}, tienda de ${tienda.categoria} en ${tienda.ubicacion}. ${tienda.productos} productos publicados en UNIKO-RD.`,
        },
        { property: "og:title", content: `${tienda.nombre} · UNIKO-RD` },
        {
          property: "og:description",
          content: `${tienda.categoria} en ${tienda.ubicacion} · ${tienda.rating} de calificación`,
        },
      ],
    };
  },
  component: DetalleTienda,
});

function DetalleTienda() {
  const { tienda } = Route.useLoaderData();
  const susProductos = productos.filter((p) => p.tienda === tienda.nombre);
  const listado = susProductos.length ? susProductos : productos.slice(0, 4);

  return (
    <div>
      <div className="h-40 w-full overflow-hidden bg-muted sm:h-56">
        <img src={tienda.portada} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-end gap-4">
            <img
              src={tienda.logo}
              alt={tienda.nombre}
              className="-mt-10 h-24 w-24 shrink-0 rounded-3xl border-4 border-card object-cover"
            />
            <div className="min-w-0 pb-2">
              <div className="flex min-w-0 items-center gap-2">
                <h1 className="truncate text-xl sm:text-2xl">{tienda.nombre}</h1>
                {tienda.verificado ? <BadgeVerificado texto="Negocio Verificado" /> : null}
              </div>
              <p className="text-sm text-muted-foreground">{tienda.categoria}</p>
            </div>
          </div>
          <div className="flex gap-2 pb-2">
            <button type="button" className="btn-base btn-brand">
              Seguir tienda
            </button>
            <Link to="/mensajes" className="btn-base btn-outline">
              Contactar
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {tienda.ubicacion}
          </span>
          <Estrellas rating={tienda.rating} resenas={tienda.resenas} />
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {tienda.seguidores.toLocaleString("es-DO")} seguidores
          </span>
          <span className="inline-flex items-center gap-1">
            <Package className="h-3.5 w-3.5" /> {tienda.productos} productos
          </span>
        </div>

        <div className="py-8">
          <TituloSeccion titulo="Productos de la tienda" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {listado.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        </div>

        <div className="pb-8">
          <TituloSeccion titulo="Servicios de la tienda" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {servicios.slice(0, 2).map((s) => (
              <TarjetaServicio key={s.id} servicio={s} />
            ))}
          </div>
        </div>

        <div className="card-uniko mb-10 p-6">
          <h2 className="text-lg">Políticas de la tienda</h2>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>• Envíos a todo el país de 24 a 72 horas.</li>
            <li>• Devoluciones dentro de 7 días con el empaque original.</li>
            <li>• Pagos con tarjeta, transferencia o contra entrega según la zona.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

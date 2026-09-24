import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, CalendarCheck, ShieldCheck } from "lucide-react";
import { formatearRD, servicios } from "@/data/marketplace";
import { BadgeVerificado, Estrellas, TituloSeccion } from "@/components/uniko/Primitivos";
import { TarjetaServicio } from "@/components/uniko/Tarjetas";

export const Route = createFileRoute("/servicios/$servicioId")({
  loader: ({ params }) => {
    const servicio = servicios.find((s) => s.id === params.servicioId);
    if (!servicio) throw notFound();
    return { servicio };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Servicio no encontrado · UNIKO-RD" }, { name: "robots", content: "noindex" }],
      };
    }
    const { servicio } = loaderData;
    return {
      meta: [
        { title: `${servicio.titulo} · UNIKO-RD` },
        {
          name: "description",
          content: `${servicio.titulo} desde ${formatearRD(servicio.desde)} con ${servicio.proveedor} · ${servicio.cobertura}.`,
        },
        { property: "og:title", content: `${servicio.titulo} · UNIKO-RD` },
        {
          property: "og:description",
          content: `Desde ${formatearRD(servicio.desde)} · ${servicio.proveedor} (${servicio.ubicacion})`,
        },
      ],
    };
  },
  component: DetalleServicio,
});

function DetalleServicio() {
  const { servicio } = Route.useLoaderData();
  const otros = servicios.filter((s) => s.id !== servicio.id).slice(0, 4);

  const paquetes = [
    {
      nombre: "Básico",
      precio: servicio.desde,
      incluye: ["Diagnóstico inicial", "Alcance esencial", "1 revisión"],
    },
    {
      nombre: "Estándar",
      precio: servicio.desde * 2,
      incluye: ["Alcance completo", "Seguimiento semanal", "3 revisiones"],
      destacado: true,
    },
    {
      nombre: "Premium",
      precio: servicio.desde * 4,
      incluye: ["Proyecto integral", "Prioridad de atención", "Revisiones ilimitadas"],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,0.8fr)]">
        <div className="min-w-0">
          <div className="card-uniko overflow-hidden">
            <img src={servicio.imagen} alt={servicio.titulo} className="aspect-16/9 w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={servicio.imagen}
                alt=""
                loading="lazy"
                className="aspect-4/3 w-full rounded-xl border border-border object-cover"
              />
            ))}
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl">{servicio.titulo}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-foreground">{servicio.proveedor}</span>
            {servicio.verificado ? <BadgeVerificado texto="Profesional Verificado" /> : null}
            <Estrellas rating={servicio.rating} resenas={servicio.resenas} />
          </div>

          <div className="card-uniko mt-6 p-6">
            <h2 className="text-lg">Sobre el servicio</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {servicio.proveedor} ofrece {servicio.titulo.toLowerCase()} con atención personalizada.
              Trabajo presupuestado antes de iniciar, comunicación por el chat de UNIKO-RD y garantía
              de cumplimiento. Zona base: {servicio.ubicacion}. {servicio.cobertura}.
            </p>
            <h3 className="mt-5 text-base">Áreas de servicio</h3>
            <p className="mt-1 text-sm text-muted-foreground">{servicio.cobertura}</p>
            <h3 className="mt-5 text-base">Disponibilidad</h3>
            <p className="mt-1 text-sm text-muted-foreground">Lunes a sábado · 8:00 a.m. – 6:00 p.m.</p>
          </div>

          <div className="mt-8">
            <TituloSeccion titulo="Paquetes" descripcion="Elige el alcance que necesitas" />
            <div className="grid gap-4 sm:grid-cols-3">
              {paquetes.map((p) => (
                <div
                  key={p.nombre}
                  className={`card-uniko p-5 ${p.destacado ? "border-brand" : ""}`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">{p.nombre}</p>
                  <p className="mt-2 text-xl font-bold text-brand">{formatearRD(p.precio)}</p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {p.incluye.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                  <Link to="/mensajes" className="btn-base btn-outline mt-4 w-full py-2 text-[13px]">
                    Elegir {p.nombre}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="card-uniko mt-8 p-6">
            <h2 className="text-lg">Reseñas de clientes</h2>
            <div className="mt-3 space-y-4 text-sm text-muted-foreground">
              <p>“Cumplió con el tiempo acordado y el precio fue justo.” — Cliente verificado</p>
              <p>“Muy profesional, volvería a contratarlo.” — Cliente verificado</p>
            </div>
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-40">
          <div className="card-uniko p-6">
            <p className="text-sm text-muted-foreground">Precio inicial</p>
            <p className="text-3xl font-bold text-brand">Desde {formatearRD(servicio.desde)}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {servicio.ubicacion}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              <CalendarCheck className="h-3.5 w-3.5" /> {servicio.cobertura}
            </p>
            <div className="mt-5 grid gap-2">
              <Link to="/mensajes" className="btn-base btn-brand">
                Solicitar servicio
              </Link>
              <Link to="/mensajes" className="btn-base btn-primary">
                Contactar proveedor
              </Link>
              <Link to="/mensajes" className="btn-base btn-outline">
                Pedir cotización
              </Link>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Tus datos privados no se comparten
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <TituloSeccion titulo="Otros servicios recomendados" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {otros.map((s) => (
            <TarjetaServicio key={s.id} servicio={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

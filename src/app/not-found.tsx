import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b1625] text-white">
      <h1 className="font-serif text-7xl">404</h1>
      <p className="mt-4 text-lg text-slate-300">
        Page not found / Página no encontrada
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#c8953d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-[#d8a651]"
        >
          Inicio
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50"
        >
          English Home
        </Link>
      </div>
    </div>
  );
}

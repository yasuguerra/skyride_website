import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#152c46] text-white">
      <h1 className="font-sans font-bold text-7xl">404</h1>
      <p className="mt-4 text-lg text-slate-300">
        Page not found / Página no encontrada
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#20d1b3] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-[#3edcc2]"
        >
          Inicio
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/50"
        >
          English Home
        </Link>
      </div>
    </div>
  );
}

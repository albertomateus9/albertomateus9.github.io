import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-amber">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Página não encontrada</h1>
      <p className="mt-2 text-sm text-ink-muted">O módulo solicitado não existe.</p>
      <Link href="/" className="mt-4 font-mono text-sm text-accent-cyan hover:text-accent-amber">
        &larr; Voltar ao início
      </Link>
    </div>
  );
}

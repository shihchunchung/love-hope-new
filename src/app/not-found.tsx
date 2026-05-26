import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-[color:var(--brand-red)]">
        找不到頁面
      </h1>
      <p className="mt-4 text-muted-foreground">
        您要找的內容可能已搬移或不存在。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-[color:var(--brand-red)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[color:var(--brand-red-strong)]"
      >
        回首頁
      </Link>
    </section>
  );
}

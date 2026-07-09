import type { ReactNode } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";

// Global layout frame: top bar + content + footer.
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-900 text-ink">
      <TopNav />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-10 lg:px-6">{children}</main>
      <Footer />
    </div>
  );
}

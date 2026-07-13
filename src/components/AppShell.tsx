import type { ReactNode } from "react";
import { SkipLink } from "./ui";
import TopNav from "./TopNav";
import Footer from "./Footer";

// Global layout frame: top bar + content + footer.
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-900 bg-grid text-ink">
      <SkipLink />
      <TopNav />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-10 outline-none lg:px-6">{children}</main>
      <Footer />
    </div>
  );
}

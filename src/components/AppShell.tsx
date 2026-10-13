import type { ReactNode } from "react";
import { SkipLink } from "./ui";
import TopNav from "./TopNav";
import Footer from "./Footer";

// Global layout frame: top bar + content + footer.
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-900 text-ink">
      <SkipLink />
      <TopNav />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-6 outline-none lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}

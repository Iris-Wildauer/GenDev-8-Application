import "./globals.css";

// Metadata for SEO
export const metadata = {
    title: "CHECK24 GenDev – Home Widgets PoC",
    description: "PoC für dezentrale Widgets",
};

function TopBar() {
    return (
        <header className="w-full bg-[#0046B3] text-white shadow-md">
            <div className="mx-auto flex items-center justify-between px-20 py-4 gap-4">

                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-xs font-bold">
                        C24
                    </div>
                    <div className="flex flex-col">
            <span className="text-xl p-6 font-semibold uppercase tracking-wide">
              GenDev 8 – Home Widgets
            </span>
                        <span className="text-xl text-white/80">
            </span>
                    </div>
                </div>

                {/* Status */}
                <div className="hidden md:flex items-center gap-2">
                </div>

                {/* Links */}
                <nav className="flex items-center gap-2 text-xl font-medium">
                    Username
                </nav>
            </div>
        </header>
    );
}

function TopBarLink({ href, label, highlight }) {
    const base =
        "rounded-full px-3 py-1 transition text-xs whitespace-nowrap border border-transparent";
    const normal = "bg-white/5 hover:bg-white/15 text-white";
    const hi = "bg-white text-[#0046B3] hover:bg-[#f3f4ff]";

    return (
        <a
            href={href}
            className={`${base} ${highlight ? hi : normal}`}
            target="_blank"
            rel="noreferrer"
        >
            {label}
        </a>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="de">
        <body className="min-h-screen bg-slate-50">
        <TopBar />
        <main className="mx-auto max-w-6xl px-1 py-6">{children}</main>
        </body>
        </html>
    );
}

import "./globals.css";
import { Usernames } from "./components/Users"

export const metadata = {
    title: "CHECK24 GenDev – Home Widgets PoC",
    description: "PoC für dezentrale Widgets",
};

function TopBar() {
    return (
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-[100]">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-8">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#004fb6] tracking-tighter">CHECK24</span>
                        <span className="text-xl font-light text-slate-400">GenDev</span>
                    </div>
                    <nav className="hidden lg:flex gap-6 text-sm font-semibold text-slate-500">
                        <span className="text-[#004fb6] border-b-2 border-[#004fb6] pb-1 cursor-default">Dashboard</span>
                        <span className="hover:text-slate-800 cursor-pointer transition-colors">Widgets</span>
                        <span className="hover:text-slate-800 cursor-pointer transition-colors">Einstellungen</span>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center shadow-sm">
                        <Usernames />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
        <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
        <TopBar />
        <main className="mx-auto max-w-[1440px] px-8 py-12">
            {children}
        </main>
        </body>
        </html>
    );
}
import './app.css';

export default function RootLayout({ children }) {
    return (
        <html lang="de">
        <body>
        <div className="navbar">
            <a href="/">
                <img src="/resources/bananaleclerc.jpg" alt="Logo" />
            </a>
        </div>
        </body>
        </html>
    );
}

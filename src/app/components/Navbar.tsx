export default function Navbar() {
    return (
        <nav className="w-full py-4 px-6 shadow-md bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600">YTDownloader</h1>
                <ul className="flex gap-6 text-sm text-gray-700 font-medium">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How it Works</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </div>
        </nav>
    );
}
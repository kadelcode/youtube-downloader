import { PiYoutubeLogo } from "react-icons/pi";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full py-4 px-6 shadow-md bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl font-bold flex items-center text-gray-900"
                >
                    <PiYoutubeLogo size={30} className="text-rose-600 inline" />
                    <span>ReelGrab</span>
                </Link>
                <ul className="flex gap-6 text-sm text-gray-700 font-medium">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How it Works</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </div>
        </nav>
    );
}
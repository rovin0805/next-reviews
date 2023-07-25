import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link
            href="/"
            className="font-orbitron font-bold text-blue-800 hover:underline"
          >
            Home
          </Link>
        </li>
        <li className="ml-auto">
          <Link
            href="/reviews"
            className="font-orbitron text-blue-800 hover:underline"
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="font-orbitron text-blue-800 hover:underline"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl h-full grid grid-cols-1 relative`}
      >
        <div className="text-white p-8 flex flex-col items-start gap-6">
          <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
          <p className="text-xl">This page doesn't exist.</p>
          <Link
            to="/"
            className="cursor-pointer font-semibold px-6 py-1.5 bg-white text-black rounded-3xl"
          >
            Go back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

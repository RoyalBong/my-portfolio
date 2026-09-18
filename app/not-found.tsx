import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-3xl place-items-center px-4 py-24 text-center">
      <div className="card rounded-[2rem] p-10 md:p-14">
        <p className="text-gradient text-7xl font-extrabold md:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">Lost in the cloud?</h1>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
          The page you are looking for drifted away like an untagged container. Let us get you
          back to solid ground.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="btn-primary rounded-full px-6 py-3 text-sm font-bold shadow-xl transition-transform hover:scale-105"
          >
            Back home
          </Link>
          <Link
            href="/#projects"
            className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}

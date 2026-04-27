import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl md:text-8xl font-bold font-display text-gradient">404</h1>
        <p className="mb-6 text-xl md:text-2xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-8 text-base text-muted-foreground max-w-md">
          The page you are looking for does not exist or has been moved. Let us get you back on track.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

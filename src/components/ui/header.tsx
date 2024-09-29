import Link from "next/link";
import { Dumbbell, User, LayoutDashboard, BarChart2 } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-card text-card-foreground shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Dumbbell className="text-primary h-8 w-8" />
              <span className="sr-only">Calisthenium</span>
            </Link>
          </div>
          <div className="hidden flex-grow md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/trainings"
                className="text-foreground hover:bg-primary/10 hover:text-primary flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                My Trainings
              </Link>
              <Link
                href="/avatar"
                className="text-foreground hover:bg-primary/10 hover:text-primary flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <User className="mr-2 h-4 w-4" />
                My Avatar
              </Link>
              <Link
                href="/dashboard"
                className="text-foreground hover:bg-primary/10 hover:text-primary flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonAvatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

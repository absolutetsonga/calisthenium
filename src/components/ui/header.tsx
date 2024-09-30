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
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="sr-only">Calisthenium</span>
            </Link>
          </div>
          <div className="flex-grow md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/trainings"
                className="flex items-center justify-center rounded-md px-1 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary sm:px-3"
              >
                <BarChart2 className="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
                <p className="hidden sm:block"> My Trainings </p>
              </Link>
              <Link
                href="/avatar"
                className="flex items-center justify-center rounded-md px-1 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary sm:px-3"
              >
                <User className="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
                <p className="hidden sm:block"> My Avatar</p>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center rounded-md px-1 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary sm:px-3"
              >
                <LayoutDashboard className="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
                <p className="hidden sm:block"> Dashboard </p>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <SignInButton>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
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

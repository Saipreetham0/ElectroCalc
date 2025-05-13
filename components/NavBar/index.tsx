
// "use client";
// import { useState, useCallback } from "react";
// import { Dialog } from "@headlessui/react";
// import Link from "next/link";
// import { Menu, X, ChevronDown, Zap } from "lucide-react";
// import ThemeButton from "../Theme";
// import ShareButton from "../ShareButton";

// interface NavLink {
//   name: string;
//   href: string;
// }

// const navigation: NavLink[] = [
//   {
//     name: "About Us",
//     href: "https://circuitofthings.com/about-us",
//   },
//   {
//     name: "Blog",
//     href: "https://circuitofthings.com/?utm_source=electrocalc&utm_medium=referral&utm_campaign=general_traffic",
//   },
//   {
//     name: "Contact",
//     href: "https://circuitofthings.com/get-in-touch/",
//   },
// ];

// const Navbar: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = useCallback(() => {
//     setMobileMenuOpen((prev) => !prev);
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
//       <nav
//         className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
//         aria-label="Global"
//       >
//         {/* Mobile menu button */}
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
//             onClick={toggleMobileMenu}
//             aria-expanded={mobileMenuOpen}
//             aria-controls="mobile-menu"
//           >
//             <span className="sr-only">
//               {mobileMenuOpen ? "Close main menu" : "Open main menu"}
//             </span>
//             <Menu className="h-6 w-6" aria-hidden="true" />
//           </button>
//         </div>

//         {/* Logo */}
//         <div className="flex lg:flex-1">
//           {/* <Zap className="w-8 h-8 text-primary" /> */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 transition-transform hover:scale-105"
//             aria-label="Circuit Of Things Home"
//           >
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
//               ElectroCalc
//             </span>
//           </Link>
//         </div>

//         {/* Mobile actions */}
//         <div className="flex items-center gap-2 lg:hidden">
//           <ThemeButton />
//           <ShareButton />
//         </div>

//         {/* Desktop navigation */}
//         <div className="hidden lg:flex lg:gap-x-8">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200 relative group"
//             >
//               {item.name}
//               <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
//             </Link>
//           ))}
//         </div>

//         {/* Desktop actions */}
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
//           <ThemeButton />
//           <ShareButton />
//           <Link
//             href="#"
//             className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900 transition-all duration-200"
//           >
//             Login
//           </Link>
//         </div>
//       </nav>

//       {/* Mobile menu */}
//       <Dialog
//         as="div"
//         className="lg:hidden"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//       >
//         <div
//           className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80"
//           aria-hidden="true"
//         />

//         <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:ring-gray-800 transition-transform duration-300">
//           <div className="flex items-center justify-between">
//             <Link
//               href="/"
//               className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               ElectroCalc
//             </Link>

//             <button
//               type="button"
//               className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <span className="sr-only">Close menu</span>
//               <X className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>

//           <div className="mt-6 flow-root">
//             <div className="space-y-1 py-6">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-all duration-200"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
//                 <Link
//                   href="#"
//                   className="flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Dialog.Panel>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;


"use client";
import { useState, useCallback, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Menu, X, ChevronDown, Zap, ExternalLink, LogIn } from "lucide-react";
import ThemeButton from "../Theme";
import ShareButton from "../ShareButton";

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

const navigation: NavLink[] = [
  {
    name: "About Us",
    href: "https://circuitofthings.com/about-us",
    // isExternal: true,
  },
  {
    name: "Blog",
    href: "https://circuitofthings.com/?utm_source=electrocalc&utm_medium=referral&utm_campaign=general_traffic",
    // isExternal: true,
  },
  {
    name: "Contact",
    href: "https://circuitofthings.com/get-in-touch/",
    // isExternal: true,
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-md"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-md"></div>
      </div>

      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-700 hover:bg-gray-100/60 dark:text-gray-200 dark:hover:bg-gray-800/70 transition-all duration-200"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
            aria-label="ElectroCalc Home"
          >
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              ElectroCalc
            </span>
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeButton />
          <ShareButton />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="group relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200 rounded-full hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
            >
              <div className="flex items-center gap-1">
                {item.name}
                {item.isExternal && (
                  <ExternalLink className="h-3 w-3 opacity-70" />
                )}
              </div>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 -translate-x-1/2 group-hover:w-1/2 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <ThemeButton />
          <ShareButton />
          {/* <Link
            href="#"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50"
          >
            <span className="relative flex items-center gap-2 rounded-full bg-white px-5 py-2.5 transition-all duration-200 dark:bg-gray-900 group-hover:bg-opacity-0">
              <span className="text-blue-600 dark:text-blue-400 group-hover:text-white">Login</span>
              <LogIn className="h-4 w-4 text-blue-600 dark:text-blue-400 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5" />
            </span>
          </Link> */}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md dark:bg-gray-900/80"
          aria-hidden="true"
        />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:ring-gray-800 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                ElectroCalc
              </span>
            </Link>

            <button
              type="button"
              className="rounded-full p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 flow-root">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.isExternal && (
                    <ExternalLink className="h-4 w-4 opacity-70" />
                  )}
                </Link>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Theme & sharing</p>
                  <div className="flex gap-2">
                    <ThemeButton />
                    <ShareButton />
                  </div>
                </div>

                {/* <Link
                  href="#"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Login to your account</span>
                  <LogIn className="h-5 w-5" />
                </Link> */}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;

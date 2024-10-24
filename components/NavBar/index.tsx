// "use client";
// import { useState } from "react";
// import { Dialog, Popover } from "@headlessui/react";

// import Link from "next/link"; // Import Link from Next.js
// import Image from "next/image"; // Import Image from Next.js
// import ThemeButton from "../Theme";
// import ShareButton from "../ShareButton";

// const products = [
//   //   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
// ];
// const callsToAction = [
//   //   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
// ];

// function classs(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 bg-white dark:bg-gray-900">
//       <nav
//         className=" mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 "
//         aria-label="Global"
//       >
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <span className="sr-only">Open main menu</span>
//             {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-6 h-6 dark:text-white"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex lg:flex-1 ">
//           <Link href="/" className="-m-1.5 p-1.5">
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
//               Circuit Of Things
//             </span>
//             {/* <Image
//                 className="h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 alt=""
//                 width={32} // Set the width of the image
//                 height={32} // Set the height of the image
//               /> */}
//           </Link>
//         </div>
//         <div className="flex lg:hidden">
//           <ThemeButton />
//           <ShareButton />
//         </div>

//         <Popover.Group className="hidden lg:flex lg:gap-x-12">
//           {/* Add your Popover content here */}

//           <Link
//             href="https://circuitofthings.com/about-us"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             About Us
//           </Link>
//           <Link
//             href="https://circuitofthings.com/?utm_source=electrocalc&utm_medium=referral&utm_campaign=general_traffic"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             Blog
//           </Link>
//           <Link
//             href="https://circuitofthings.com/get-in-touch/"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             Contact
//           </Link>
//         </Popover.Group>

//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <ThemeButton />
//           <ShareButton />
//           {/* <Link
//             href="#"
//             className="cursor-pointer flex lg:shrink-0 justify-center items-center gap-2 font-semibold transition-all duration-300 rounded-full focus-visible:ring focus-visible:ring-red-800 focus-visible:ring-opacity-10 ring-red-800 focus:outline-none select-none disabled:cursor-not-allowed disabled:opacity-80 text-gray-50 dark:text-gray-900 bg-indigo-600 dark:bg-blue-300 hover:bg-blue-500 dark:hover:bg-blue-400 lg:px-7 px-6 lg:py-3 py-2 lg:text-md text-sm group relative w-1/5"
//           >
//             Login
//           </Link> */}
//         </div>
//       </nav>
//       <div className="w-full border-t border-gray-300" />

//       <Dialog
//         as="div"
//         className="lg:hidden"
//         open={mobileMenuOpen}
//         onClose={() => setMobileMenuOpen(false)}
//       >
//         {/* Add your mobile menu content here */}
//         <div className="fixed inset-0 z-10" />
//         <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-800">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Circuit Of Things</span>
//               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//                 Circuit of Things
//               </span>
//               {/* <img
//                 className="h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 alt=""
//               /> */}
//             </Link>

//             <button
//               type="button"
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <span className="sr-only">Close menu</span>
//               {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-6 h-6 dark:text-white"
//                 aria-hidden="true"
//               >
//                 <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
//               </svg>
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 {/* <Disclosure as="div" className="-mx-3">
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
//                         Product
//                         <ChevronDownIcon
//                           className={classs(
//                             open ? "rotate-180" : "",
//                             "h-5 w-5 flex-none"
//                           )}
//                           aria-hidden="true"
//                         />
//                       </Disclosure.Button>
//                       <Disclosure.Panel className="mt-2 space-y-2">
//                         {[...products, ...callsToAction].map((item) => (
//                           <Disclosure.Button
//                             key={item.name}
//                             as="a"
//                             href={item.href}
//                             className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                           >
//                             {item.name}
//                           </Disclosure.Button>
//                         ))}
//                       </Disclosure.Panel>
//                     </>
//                   )}
//                 </Disclosure> */}

//                 <Link
//                   href="https://circuitofthings.com/about-us"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50   dark:text-white dark:hover:bg-gray-700"
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   href="https://circuitofthings.com/?utm_source=electrocalc&utm_medium=referral&utm_campaign=general_traffic"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   Blog
//                 </Link>
//                 <Link
//                   href="https://circuitofthings.com/get-in-touch/"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   Contact
//                 </Link>
//               </div>
//               <div className="py-6">
//                 <Link
//                   href="#"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Dialog.Panel>
//       </Dialog>
//     </header>
//   );
// }


"use client";
import { useState, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeButton from "../Theme";
import ShareButton from "../ShareButton";

interface NavLink {
  name: string;
  href: string;
}

const navigation: NavLink[] = [
  {
    name: "About Us",
    href: "https://circuitofthings.com/about-us",
  },
  {
    name: "Blog",
    href: "https://circuitofthings.com/?utm_source=electrocalc&utm_medium=referral&utm_campaign=general_traffic",
  },
  {
    name: "Contact",
    href: "https://circuitofthings.com/get-in-touch/",
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
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
            className="flex items-center gap-2 transition-transform hover:scale-105"
            aria-label="Circuit Of Things Home"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Circuit Of Things
            </span>
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeButton />
          <ShareButton />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <ThemeButton />
          <ShareButton />
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80" aria-hidden="true" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:ring-gray-800 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Circuit of Things
            </Link>

            <button
              type="button"
              className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="space-y-1 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href="#"
                  className="flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

const toolColumns = [
  {
    label: "Fundamentals",
    links: [
      { name: "Ohm's Law Calculator", href: "/ohms-law-calculator" },
      { name: "Voltage Divider", href: "/voltage-divider-calculator" },
      { name: "Star-Delta Conversion", href: "/Star-Delta-Conversion" },
      { name: "Pull-up / Pull-down", href: "/pullup-pulldown-calculator" },
    ],
  },
  {
    label: "Components",
    links: [
      { name: "Resistor Color Code", href: "/resistor-color-code-calculator" },
      { name: "SMD Resistor Decoder", href: "/smd-resistor-code-decoder" },
      { name: "Capacitor Code", href: "/capacitor-code-calculator" },
      { name: "LED Series Resistor", href: "/led-resistor-calculator" },
    ],
  },
  {
    label: "Wire & Cable",
    links: [
      { name: "AWG Wire Gauge", href: "/awg-wire-gauge-calculator" },
      { name: "SWG Wire Gauge", href: "/swg-wire-gauge-calculator" },
    ],
  },
  {
    label: "Power & Battery",
    links: [
      { name: "Inverter Calculator", href: "/inverter-calculator" },
      { name: "Battery Backup Time", href: "/battery-backup-time-calculator" },
      { name: "Battery Charging Time", href: "/battery-charging-time-calculator" },
      { name: "Inverter Matching", href: "/inverter-battery-matching-calculator" },
      { name: "AC Load Calculator", href: "/ac-load-calculator" },
      { name: "DC Load Calculator", href: "/dc-load-calculator" },
      { name: "Solar Calculator", href: "/solar-load-calculator" },
    ],
  },
];

const companyLinks = [
  { name: "About", href: "https://kspelectronics.in/about" },
  { name: "Blog", href: "https://kspelectronics.in/blog" },
  { name: "Contact", href: "https://kspelectronics.in/contact" },
  { name: "Terms of Use", href: "https://kspelectronics.in/terms" },
  { name: "Privacy Policy", href: "https://kspelectronics.in/privacy" },
];

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@kspelectronics0",
    icon: <Youtube className="h-4 w-4" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/kspelectronics.in",
    icon: <Facebook className="h-4 w-4" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/kspelectronics-in",
    icon: <Github className="h-4 w-4" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kspelectronics",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=919550421866&text&type=phone_number&app_absent=0",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060a14]">
      {/* Newsletter / CTA band */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-8 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Need electronic components?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Shop resistors, capacitors, sensors, dev boards, and project kits at our store.
            </p>
          </div>
          <a
            href="https://kspelectronics.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Visit kspelectronics.in
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-12 pb-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Light mode logo */}
            <Image
              src="/KSP Electronics-black.png"
              alt="KSP Electronics"
              width={160}
              height={40}
              className="h-8 w-auto dark:hidden mb-3"
            />
            {/* Dark mode logo */}
            <Image
              src="/KSP Electronics-white.png"
              alt="KSP Electronics"
              width={160}
              height={40}
              className="h-8 w-auto hidden dark:block mb-3"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mb-5">
              Free, open-source electronics calculators for engineers, students, and makers. Built and maintained by KSP Electronics.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="group p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#1C61E7] hover:border-[#1C61E7]/40 hover:bg-[#1C61E7]/5 dark:hover:border-[#1C61E7]/40 dark:hover:bg-[#1C61E7]/10 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tool columns */}
          {toolColumns.map((col) => (
            <div key={col.label}>
              <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">
                {col.label}
              </h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1C61E7] dark:hover:text-[#3d7ef0] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} KSP Electronics. All rights reserved.
            </p>

            {/* Company links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {companyLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 dark:text-slate-500 hover:text-[#1C61E7] dark:hover:text-[#3d7ef0] transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>

            {/* Domain */}
            <p className="text-sm text-slate-400 dark:text-slate-500 font-mono">
              tools.kspelectronics.in
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

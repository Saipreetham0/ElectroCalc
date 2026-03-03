"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Youtube, Facebook, Linkedin, Phone, Mail, ArrowUpRight } from "lucide-react";

/* ── Data ── */
const calculatorLinks = [
  { name: "Ohm's Law Calculator", href: "/ohms-law-calculator" },
  { name: "Resistor Color Code", href: "/resistor-color-code-calculator" },
  { name: "SMD Resistor Decoder", href: "/smd-resistor-code-decoder" },
  { name: "Capacitor Code", href: "/capacitor-code-calculator" },
  { name: "Voltage Divider", href: "/voltage-divider-calculator" },
  { name: "LED Series Resistor", href: "/led-resistor-calculator" },
  { name: "Pull-up / Pull-down", href: "/pullup-pulldown-calculator" },
  { name: "Star-Delta Conversion", href: "/Star-Delta-Conversion" },
  { name: "AWG Wire Gauge", href: "/awg-wire-gauge-calculator" },
  { name: "SWG Wire Gauge", href: "/swg-wire-gauge-calculator" },
  { name: "Inverter Calculator", href: "/inverter-calculator" },
  { name: "Battery Backup Time", href: "/battery-backup-time-calculator", badge: "New" },
  { name: "Battery Charging Time", href: "/battery-charging-time-calculator", badge: "New" },
  { name: "Solar Calculator", href: "/solar-load-calculator", badge: "New" },
  { name: "AC Load Calculator", href: "/ac-load-calculator", badge: "New" },
  { name: "DC Load Calculator", href: "/dc-load-calculator", badge: "New" },
  { name: "Inverter Matching", href: "/inverter-battery-matching-calculator", badge: "New" },
];

const companyLinks = [
  { name: "About Us", href: "https://kspelectronics.in/about" },
  { name: "Blog", href: "https://kspelectronics.in/blog" },
  { name: "Contact Us", href: "https://kspelectronics.in/contact" },
  { name: "Privacy Policy", href: "https://kspelectronics.in/privacy" },
  { name: "Terms & Conditions", href: "https://kspelectronics.in/terms" },
];

const socialLinks = [
  { name: "YouTube", href: "https://www.youtube.com/@kspelectronics0", icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/kspelectronics.in", icon: Facebook },
  { name: "GitHub", href: "https://github.com/kspelectronics-in", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/kspelectronics", icon: Linkedin },
];

/* ── Footer ── */
const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060a14]">

      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-14 pb-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-3">
            <Image src="/KSP Electronics-black.png" alt="KSP Electronics" width={160} height={40} className="h-8 w-auto dark:hidden mb-4" />
            <Image src="/KSP Electronics-white.png" alt="KSP Electronics" width={160} height={40} className="h-8 w-auto hidden dark:block mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-xs">
              Free, open-source electronics calculators for engineers, students, and makers. Built and maintained by KSP Electronics.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-5">
              <a href="tel:+919550421866" className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-[#1C61E7] transition-colors">
                <Phone className="h-3.5 w-3.5 text-[#1C61E7] flex-shrink-0" />
                +91 9550421866
              </a>
              <a href="mailto:info@kspelectronics.in" className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-[#1C61E7] transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#1C61E7] flex-shrink-0" />
                info@kspelectronics.in
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#1C61E7] hover:border-[#1C61E7]/40 hover:bg-[#1C61E7]/5 dark:hover:border-[#1C61E7]/40 dark:hover:bg-[#1C61E7]/10 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send/?phone=919550421866&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 dark:hover:border-[#25D366]/40 dark:hover:bg-[#25D366]/10 transition-all duration-200"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Calculators — 2 sub-columns */}
          <div className="lg:col-span-5">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Calculators</h4>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2">
                {calculatorLinks.slice(0, 9).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1C61E7] dark:hover:text-[#3d7ef0] transition-colors inline-flex items-center gap-1.5">
                      {link.name}
                      {link.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#21C15E]/10 text-[#21C15E]">{link.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {calculatorLinks.slice(9).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1C61E7] dark:hover:text-[#3d7ef0] transition-colors inline-flex items-center gap-1.5">
                      {link.name}
                      {link.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#21C15E]/10 text-[#21C15E]">{link.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company + Shop CTA */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Company</h4>
            <ul className="space-y-2 mb-8">
              {companyLinks.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1C61E7] dark:hover:text-[#3d7ef0] transition-colors">
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Shop</h4>
            <a
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C61E7] hover:underline"
            >
              kspelectronics.in <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-3">Stay Updated</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              New tools, electronics tips & product launches from KSP Electronics.
            </p>
            <a
              href="https://kspelectronics.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1C61E7] hover:bg-[#1659d4] text-white text-sm font-semibold transition-colors"
            >
              Subscribe
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-5 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} KSP Electronics. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-mono">
            tools.kspelectronics.in
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

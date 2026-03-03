<p align="center">
  <img src="public/logo/KSP Electronics-logo-black.png" alt="ElectroCalc" width="260" />
</p>

<h3 align="center">Free, Open-Source Electronics Calculators</h3>

<p align="center">
  <strong>17 professional-grade tools</strong> for engineers, students, and makers — from Ohm's Law to solar panel sizing.<br/>
  IEEE-verified formulas. Instant results. No sign-up. Always free.
</p>

<p align="center">
  <a href="https://tools.kspelectronics.in">🌐 Live Demo</a> · 
  <a href="#-calculators">📐 Calculators</a> · 
  <a href="#-getting-started">🚀 Get Started</a> · 
  <a href="#-contributing">🤝 Contribute</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/tools-17-blue?style=flat-square" alt="17 Tools" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/react-19-61dafb?style=flat-square&logo=react" alt="React 19" />
</p>

---

## ⭐ Star This Repo

If ElectroCalc helps you in your projects, coursework, or daily work — **please give it a star!** ⭐

It helps more engineers and students discover these free tools.

[![GitHub stars](https://img.shields.io/github/stars/Saipreetham0/ElectroCalc?style=social)](https://github.com/Saipreetham0/ElectroCalc)

---

## 📐 Calculators

### Fundamentals
| Calculator | Description |
|---|---|
| **Ohm's Law** | Voltage, current & resistance calculations |
| **Voltage Divider** | Resistor divider circuit design |
| **Star-Delta Conversion** | Y ↔ Δ network transformations for 3-phase circuits |
| **Pull-up / Pull-down** | Optimal resistor values for digital logic |

### Components
| Calculator | Description |
|---|---|
| **Resistor Color Code** | Decode 4/5/6 band color codes |
| **SMD Resistor Decoder** | 3/4 digit surface-mount markings |
| **Capacitor Code** | Numeric code to capacitance values |
| **LED Series Resistor** | Current-limiting resistor selection |

### Wire & Cable
| Calculator | Description |
|---|---|
| **AWG Wire Gauge** | American Wire Gauge lookup with current ratings |
| **SWG Wire Gauge** | British/Indian Standard Wire Gauge |

### Power & Battery 🔋
| Calculator | Description |
|---|---|
| **Inverter Calculator** | Inverter VA & battery bank sizing |
| **Battery Backup Time** | Runtime estimation from Ah & load |
| **Battery Charging Time** | Charge duration from capacity & charger |
| **Inverter-Battery Matching** | Right inverter + battery combo |
| **AC Load Calculator** | Home power, monthly kWh & ₹ cost |
| **DC Load Calculator** | Off-grid DC system sizing (12V/24V/48V) |
| **Solar Calculator** | Panel, battery, charge controller & inverter sizing |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework (App Router) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Lucide React](https://lucide.dev/) | — | Icon library |
| [Radix UI](https://www.radix-ui.com/) | — | Accessible UI primitives |
| [KaTeX](https://katex.org/) | — | Math formula rendering |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Saipreetham0/ElectroCalc.git
cd ElectroCalc

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ElectroCalc/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (SEO server component)
│   ├── HomePageClient.tsx        # Homepage client UI
│   ├── ohms-law-calculator/      # Each calculator has its own folder
│   │   ├── page.tsx              # SEO metadata
│   │   └── ClientPage.tsx        # Interactive calculator UI
│   ├── resistor-color-code-calculator/
│   ├── voltage-divider-calculator/
│   ├── solar-load-calculator/
│   └── ...                       # 17 calculator folders total
├── components/
│   ├── NavBar/                   # Navbar with mega dropdown
│   ├── Footer/                   # Footer with all links
│   ├── Theme/                    # Dark/light mode toggle
│   ├── ui/                       # Reusable UI components (shadcn)
│   └── ToolPageHeader.tsx        # Shared calculator page header
├── public/
│   ├── logo/                     # KSP Electronics logos
│   └── site.webmanifest          # PWA manifest
├── styles/
│   └── globals.css               # Global styles + Tailwind
└── package.json
```

---

## 🤝 Contributing

We'd love your help making ElectroCalc better! Here's how you can contribute:

### Ways to Contribute

- 🧮 **Add a new calculator** — Build a tool that helps electronics engineers
- 🐛 **Fix bugs** — Found something broken? Fix it!
- 🎨 **Improve UI/UX** — Make the experience better
- 📝 **Improve documentation** — Better docs help everyone
- 🌐 **Add translations** — Help us go multilingual
- ⚡ **Optimize performance** — Make it faster

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/my-new-calculator`
3. **Make** your changes
4. **Test** that TypeScript compiles: `npx tsc --noEmit`
5. **Commit** with a clear message: `git commit -m "feat: add XYZ calculator"`
6. **Push** to your fork: `git push origin feat/my-new-calculator`
7. **Open** a Pull Request

### Adding a New Calculator

Each calculator follows this pattern:

```
app/your-calculator/
├── page.tsx           # Server component with SEO metadata
└── ClientPage.tsx     # "use client" — interactive calculator UI
```

1. Create the folder under `app/`
2. Add SEO metadata in `page.tsx`
3. Build the calculator UI in `ClientPage.tsx`
4. Register it in `app/HomePageClient.tsx` (calculators array)
5. Add it to the navbar in `components/NavBar/index.tsx`
6. Add it to the footer in `components/Footer/index.tsx`
7. Add it to the sitemap in `app/sitemap.ts`

---

## 🌟 Join the Community

- ⭐ **Star this repo** to show your support
- 🍴 **Fork it** and build your own tools
- 🐛 **Open issues** for bugs or feature requests
- 💬 **Discussions** — share ideas and ask questions
- 📢 **Share** with fellow engineers and students

[![GitHub stars](https://img.shields.io/github/stars/Saipreetham0/ElectroCalc?style=for-the-badge&logo=github)](https://github.com/Saipreetham0/ElectroCalc/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Saipreetham0/ElectroCalc?style=for-the-badge&logo=github)](https://github.com/Saipreetham0/ElectroCalc/fork)
[![GitHub issues](https://img.shields.io/github/issues/Saipreetham0/ElectroCalc?style=for-the-badge&logo=github)](https://github.com/Saipreetham0/ElectroCalc/issues)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

| | Link |
|---|---|
| 🌐 **Live App** | [tools.kspelectronics.in](https://tools.kspelectronics.in) |
| 🛒 **Shop Components** | [kspelectronics.in](https://kspelectronics.in) |
| 📺 **YouTube** | [@kspelectronics0](https://www.youtube.com/@kspelectronics0) |
| 💼 **LinkedIn** | [KSP Electronics](https://www.linkedin.com/company/kspelectronics) |
| 📘 **Facebook** | [kspelectronics.in](https://www.facebook.com/kspelectronics.in) |

---

<p align="center">
  Built with ❤️ by <a href="https://kspelectronics.in"><strong>KSP Electronics</strong></a><br/>
  <sub>Telangana, India 🇮🇳</sub>
</p>

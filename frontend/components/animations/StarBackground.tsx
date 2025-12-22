// "use client";

// import { useEffect, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import { useTheme } from "next-themes"; // Import this hook

// const StarBackground = () => {
//   const [init, setInit] = useState(false);
//   const { theme } = useTheme(); // Get current theme
  
//   // Determine particle color: White for Dark Mode, Dark Gray for Light Mode
//   const particleColor = theme === "light" ? "#475569" : "#ffffff";
//   const linkColor = theme === "light" ? "#cbd5e1" : "#8b5cf6";

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   if (!init) return null;

//   return (
//     <Particles
//       id="tsparticles"
//       // Key is crucial! It forces the component to restart when theme changes
//       key={theme} 
//       options={{
//         fpsLimit: 60,
//         background: {
//           color: "transparent", // Let CSS handle background color
//         },
//         particles: {
//           color: { value: particleColor }, // Dynamic Color
//           links: {
//             color: linkColor, // Dynamic Line Color
//             distance: 150,
//             enable: true,
//             opacity: 0.3,
//             width: 1,
//           },
//           move: {
//             enable: true,
//             speed: 0.6,
//           },
//           number: {
//             value: 60, // Slightly fewer stars for cleaner look
//           },
//           opacity: {
//             value: 0.5,
//           },
//           size: {
//             value: { min: 1, max: 2 },
//           },
//         },
//         detectRetina: true,
//       }}
//       className="absolute top-0 left-0 w-full h-full -z-10"
//     />
//   );
// };

// export default StarBackground;







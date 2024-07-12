// // components/Card.js
// import Image from "next/image";
// const Card = ({ title, category, description, image }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-col items-center transform hover:scale-105 transition-transform">
//       {/* <Image src={image} alt={title} className="w-16 h-16 mb-4" /> */}
//       <h3 className="text-lg font-bold mb-2">{title}</h3>
//       <p className="text-sm text-orange-600 mb-4">{category}</p>
//       <p className="text-gray-700 text-center">{description}</p>
//     </div>
//   );
// };

// export default Card;

// components/Card.js
import Link from "next/link";
import Image from "next/image";
const Card = ({ title, category, description, image, url }) => {
  return (
    // <Link href={link} >
    <Link
      href={url}
      className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-col items-center transform hover:scale-105 transition-transform no-underline"
      // className="block h-48 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
    >
      {/* <Image src={image} alt={title} className="w-16 h-16 mb-4" /> */}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-orange-600 mb-4">{category}</p>
      <p className="text-gray-700 text-center">{description}</p>
    </Link>
  );
};

export default Card;

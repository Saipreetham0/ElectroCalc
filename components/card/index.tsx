import React from "react";
import Link from "next/link";

interface CardProps {
    title: string;
    category: string;
    description: string;
    image?: string;
    url: string;
}

const Card: React.FC<CardProps> = ({ title, category, description, url }) => {
    return (
        <Link
            href={url}
            className="p-6 m-4 flex flex-col items-center transform hover:scale-105 transition-transform no-underline bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <h3 className="text-lg font-bold mb-2 dark:text-white">{title}</h3>
            <p className="text-sm text-orange-600 mb-4">{category}</p>
            <p className="text-gray-700 text-center dark:text-gray-300">{description}</p>
        </Link>
    );
};

export default Card;

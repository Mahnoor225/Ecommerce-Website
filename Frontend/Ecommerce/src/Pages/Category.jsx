// import { Shirt } from 'react-icons/fa';
// import { Smartphone } from 'react-icons/md';
// import { ShoppingBag } from 'react-icons/io';
// import { GiBoot } from 'react-icons/gi'; // Corrected import for Boot
// import { Apple } from 'react-icons/fa';
// i 

import { useState } from "react";


// import { Heart } from 'react-icons/fa';
// import { GemIcon } from 'react-icons/fa';

const categories = [
  {
    name: "Fashion",
    img: "https://serviceapi.spicezgold.com/download/1744509970781_fash.png",
    color: "bg-pink-50 text-pink-500",
    borderColor: "border-pink-200",
    hoverColor: "hover:bg-pink-100",
  },
  {
    name: "Electronics",
   img: "https://serviceapi.spicezgold.com/download/1741660988059_ele.png",
    color: "bg-blue-50 text-blue-500",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-100",
  },
  {
    name: "Bags",
    img: "https://serviceapi.spicezgold.com/download/1741661045887_bag.png",
    color: "bg-purple-50 text-purple-500",
    borderColor: "border-purple-200",
    hoverColor: "hover:bg-purple-100",
  },
  {
    name: "Footwear",
   img: "https://serviceapi.spicezgold.com/download/1741661061379_foot.png",
    color: "bg-amber-50 text-amber-500",
    borderColor: "border-amber-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    name: "Groceries",
    img: "https://serviceapi.spicezgold.com/download/1741661077633_gro.png",
    color: "bg-green-50 text-green-500",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-100",
  },
  {
    name: "Beauty",
   img: "https://serviceapi.spicezgold.com/download/1741661092792_beauty.png",
    color: "bg-rose-50 text-rose-500",
    borderColor: "border-rose-200",
    hoverColor: "hover:bg-rose-100",
  },
  {
    name: "Wellness",
    img: "https://serviceapi.spicezgold.com/download/1741661105893_well.png",
    color: "bg-teal-50 text-teal-500",
    borderColor: "border-teal-200",
    hoverColor: "hover:bg-teal-100",
  },
  {
    name: "Jewellery",
    img: "https://serviceapi.spicezgold.com/download/1741661120743_jw.png",
    color: "bg-yellow-50 text-yellow-500",
    borderColor: "border-yellow-200",
    hoverColor: "hover:bg-yellow-100",
  },
];



const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-10 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 text-sm font-medium transition-colors border rounded-md ${category.color} ${category.borderColor} ${category.hoverColor} ${
              selectedCategory === category.name ? "text-white bg-gray-900" : "text-gray-700"
            }`}
          >
            {/* Icon or Image */}
            {category.icon ? (
              <category.icon className="w-5 h-5 mr-2" />
            ) : (
              category.img && <img src={category.img} alt={category.name} className="w-16 h-16 mr-2 pl-3" />
            )}
          <div className="mt-2">
          {category.name}
          </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;

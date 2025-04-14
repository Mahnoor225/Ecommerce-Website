const banners = [
    {
      img: "https://serviceapi.spicezgold.com/download/1741663363237_1737020916820_New_Project_52.jpg",
      textPosition: "left-4 md:left-40 ",
      title: "Buy Women's Products at Low Prices",
      price: "$499",
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png",
      textPosition: "left-4 ",
      title: "Buy Men's Bags at Discounted Rates",
      price: "$799",
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg",
      textPosition: "left-4",
      title: "Get the Latest Apple iPhone",
      price: "$999",
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
      textPosition: "left-4 md:left-40",
      title: "Men's Footwear at Best Prices",
      price: "$599",
    },
  ]
  
  const Banner1 = () => {
    return (
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {banners.map((banner, index) => (
            <div key={index} className="relative overflow-hidden rounded-md shadow-md">
              <img
                src={banner.img || "/placeholder.svg"}
                alt={`banner-${index}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className={`absolute top-6 ${banner.textPosition} text-black font-medium space-y-1`}>
                <h1 className="text-sm sm:text-base md:text-lg leading-tight">{banner.title}</h1>
                <span className="block text-green-600 font-semibold">{banner.price}</span>
                <h1 className="underline cursor-pointer hover:text-blue-600">Shop Now</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Banner1
  
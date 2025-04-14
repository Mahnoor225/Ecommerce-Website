import React from 'react';

const Banner3 = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669012402_banner1.webp"
          alt="Banner 1"
          className="w-full h-auto rounded-md object-cover"
        />
        <img
          src="https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp"
          alt="Banner 2"
          className="w-full h-auto rounded-md object-cover"
        />
          <img
          src="https://serviceapi.spicezgold.com/download/1741669057847_banner5.webp"
          alt="Banner 3"
          className="w-full h-auto rounded-md object-cover"
        />
        <img
          src="https://serviceapi.spicezgold.com/download/1742453755529_1741669087880_banner6.webp"
          alt="Banner 4"
          className="w-full h-auto rounded-md object-cover"
        />
      </div>

      {/* <div className="mt-6 grid grid-cols-1 gap-6">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669012402_banner1.webp"
          alt="Banner 3"
          className="w-full h-auto rounded-md object-cover"
        />
        <img
          src="https://serviceapi.spicezgold.com/download/1741669012402_banner1.webp"
          alt="Banner 4"
          className="w-full h-auto rounded-md object-cover"
        />
      </div> */}
    </div>
  );
};

export default Banner3;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const SliderComponent = () => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: 1500,          // time in ms between slides
        disableOnInteraction: false, // keeps autoplay even after manual swipe
      }}
      modules={[Autoplay]}   // Register autoplay module
      style={{ height: '400px' }}
    >
      <SwiperSlide>
        <img
          src="https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg"
          className="w-full h-auto"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg"
          className="w-full h-auto"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg"
          className="w-full h-auto"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://serviceapi.spicezgold.com/download/1741660777364_NewProject(12).jpg"
          className="w-full h-auto"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderComponent;

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./carousel.scss";

const Carousel = () => {
  const [animalList, setAnimalList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/animals", {
        params: {
          limit: 100,
        },
      })
      .then(({ data }) => {
        setAnimalList(data.animals);
      })
      .catch((err) => {
        console.log("Error retrieving animals");
      });
  }, []);

  // Filter only animals with photos
  const filteredAnimals = animalList.filter((animal) => {
    return animal.primary_photo_cropped !== null;
  });
  const profilePhotos = filteredAnimals.map((animal) => {
    return (
      <SwiperSlide key={animal.id}>
        <img
          src={animal.primary_photo_cropped.small}
          className="slider-photos"
        />
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {profilePhotos}
      </Swiper>
    </>
  );
};

export default Carousel;

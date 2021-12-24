import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { sliderItems } from '../shared/constants/data';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const handleClick = (direction: string) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="slider-container">
      <div
        className="slider-arrow slider-arrow-left"
        onClick={() => handleClick('left')}
      >
        <ArrowLeftOutlined />
      </div>
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            className="slider-slide"
            key={item.id}
            style={{ backgroundColor: item.bg }}
          >
            <div className="slider-imageContainer">
              <Image
                src={item.img}
                layout="fill"
                objectFit="cover"
                alt={`slider-${item.id}`}
              />
            </div>
            <div className="slider-infoContainer">
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
              <button type="button">SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="slider-arrow slider-arrow-right"
        onClick={() => handleClick('right')}
      >
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;

import React from "react";
import { useState } from "react";
import styled from "styled-components";
import coinImage from '../../../../../public/images/coin.png';

const Wrapper = styled.div`
.coin-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.coin {
  position: absolute;
  width: 50px;
  height: 50px;
  background-image: url('/images/coin.png');
  background-size: contain;
  opacity: 0;
}

.coin.animate {
  animation: scatter 3s linear;
}

@keyframes scatter {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(-200px, 200px) rotate(720deg);
  }
}

`;

const CoinAnimation = ({ numCoins }) => {
    const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 3000);
  };
  return (
    <Wrapper>
       <div>
      <button onClick={handleClick}>Scatter Coins</button>
      <div className={`coin-container ${animate ? 'animate' : ''}`}>
        {[...Array(numCoins)].map((_, index) => (
          <img key={index} src={coinImage} className="coin" alt="coin" />
        ))}
      </div>
    </div>
    </Wrapper>
  );
};

export default CoinAnimation;

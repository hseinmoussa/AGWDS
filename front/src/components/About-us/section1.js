import React from "react";
import "./section1.css";
import painting from "./img/painting.jpg";
import hollway from "./img/hollway.jpg";
import entrance from "./img/entrance.jpg";
function AS1() {
  return (
    <section class="section-about">
      <div class="u-center-text u-margin-bottom-big">
        <h2 class="heading-secondary">
          Exciting tour into the world of imagination
        </h2>
      </div>
      <div class="row">
        <div class="col-1-of-2">
          <h3 class="heading-tertiary u-margin-bottom-small">
            You're going to fall in love with Art
          </h3>
          <p class="paragraph">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quos
            sapiente neque, dolor itaque iste amet reiciendis animi? Veniam
            laudantium nobis id officiis doloremque. Iure suscipit eligendi sunt
            recusandae quam.
          </p>
          <h3 class="heading-tertiary u-margin-bottom-small">
            Experinece the most beautiful artistic pieces
          </h3>
          <p class="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            repellendus officia consectetur earum iure laudantium est nemo.
          </p>
          <a href="#" class="btn-text">
            Learn more &rarr;
          </a>
        </div>
        <div class="col-1-of-2">
          <div class="composition">
            <img
              src={painting}
              alt="1"
              class="composition__photo composition__photo--p1"
            />
            <img
              src={entrance}
              alt="2"
              class="composition__photo composition__photo--p2"
            />
            <img
              src={hollway}
              alt="3"
              class="composition__photo composition__photo--p3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AS1;

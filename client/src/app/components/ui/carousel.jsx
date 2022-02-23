import React from "react";
import imgTaskList from "../../assets/img/promo_tasks.jpg";
import imgStatistics from "../../assets/img/promo_stat.jpg";

const Carousel = () => {
    return (
        <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-bs-ride="carousel"
        >
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img
                        src={imgTaskList}
                        class="d-block w-100"
                        alt="tasklist"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>easy add / easy manage</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img
                        src={imgStatistics}
                        class="d-block w-100"
                        alt="statistics"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>easy oversee</h5>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;

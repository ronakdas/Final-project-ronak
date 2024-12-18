import React from 'react'
import { about_banner, shapered, verified } from '../assets'
import './Styles/Features.css'

function Features() {


    return (
            <div className='feature-container'>
                <div className='container-img'>
                    <img src={about_banner} className='banner-img' />
                    <img src={shapered} className='sale-icon' />
                </div>

                <div className='feature-info'>
                    <h1 className='feature-heading'>Biriyani, Paneer Tikka Masala<span id='span'>Best in Town!!</span></h1>
                    <p className='feature-info-desc'>Indulge in a culinary experience like no other.
                                                        Discover the magic of Indian cuisine.
                                                        A taste of India, served with love..</p>
                    <div className='features'>
                        <p> <img src={verified} width="15px"/> Authentic Indian cuisine</p>
                        <p><img src={verified}width="15px"/> Taste the tradition</p>
                        <p><img src={verified}width="15px"/> Music & Other Facilities</p>
                        <p><img src={verified}width="15px"/> Fastest Food Home Delivery</p>
                    </div>
                    <button className='button feature-button'>Order Now</button>
                </div>
            </div>
    )
}

export default Features
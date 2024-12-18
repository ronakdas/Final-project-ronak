import React from 'react'
import { BsGooglePlay } from 'react-icons/bs'
import { LuConstruction } from 'react-icons/lu'
import { MdBoy, MdConstruction } from 'react-icons/md'
import { deliveryboy, footer } from '../assets'
import './Styles/Footer.css'
import { FaFacebookSquare, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa'
function Footer() {
    return (
        <div>
            <div className='footer'>

                <div className='footer-list list-1'>
                    <h2  className="logo">Kahani Khane Ki</h2>
                    <p>Humare Har Khane Mein Alag Kahani</p>
                    <div className='icons'>
                        <h2><FaFacebookSquare /></h2>
                        <h2><FaInstagram /></h2>
                        <h2><FaTwitter /></h2>
                        <h2><FaPinterest /></h2>
                    </div>
                </div>

                <div className='footer-list'>
                    <h2>Contact Info</h2>
                    <p>+91 1234567890</p>
                    <p>Info@kahanikhaneki.com</p>
                    <p>Guwahati</p>
                </div>

                <div className='footer-list'>
                    <h2>Opening Hours</h2>
                    <p>Monday-Friday: 8:00am-10:00pm</p>
                    <p>Tuesday 8:00am-10:00pm</p>
                    <p>Saturday: 8:00am-1:00am</p>
                </div>

                <div className='footer-list'>
                    <h2>Branches </h2>
                    <p>Monday-Friday: 8:00am-10:00pm</p>
                    <p>Tuesday 8:00am-10:00pm</p>
                    <p>Saturday: 8:00am-1:00am</p>
                </div>

            </div>
                <div className='footer-imgs'>
                    <img className='img-1' src={footer} />
                    <div className='footer-line'></div>
                </div>

                {/* <div className=''>
                <MdConstruction />  Website Under Construction! <LuConstruction />
                </div> */}
        </div>
    )
}

export default Footer
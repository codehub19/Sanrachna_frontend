import React from 'react';
import './Header.css';
import sanrachna_logo from '../../assets/sanrachna_logo.png';
import iitd_logo from '../../assets/iitd_logo.png';

const Header = () => {
  return (
    <div className='header'> 
        <a href='https://www.spplindia.org/' className='logo'>
            <img src={sanrachna_logo} alt="" />
        </a>
        <div className='title'>
            <h1>Sanrachna Prahari Pvt Ltd </h1>
            <h2>(An IIT Delhi Company)</h2>
        </div>
        <a href='https://home.iitd.ac.in/' className='logo'>
            <img src={iitd_logo} alt="" />
        </a>
    </div>
  );
}

export default Header;

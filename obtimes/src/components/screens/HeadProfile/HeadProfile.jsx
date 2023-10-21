import React from 'react'

const HeadProfile = () => {
    return (
        <div className="profile_box">
            <div className="photo">
                <img src="/img/me.jpeg" alt="" />
            </div>
            <div className="name">
                <span>Valerii Serhieiev</span>
                <span className='log'>@deepexet</span>
                <span className='log'>Bank: 22 h</span>
            </div>
        </div>
    )
}

export default HeadProfile
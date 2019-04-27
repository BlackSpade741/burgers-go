import React from 'react'

import './About.css'

import PageHeader from '../../components/PageHeader/PageHeader'
import PageDescription from '../../components/PageDescription/PageDescription'
import SectionCard from '../../components/SectionCard/SectionCard'

const about = (props) => {
    return (
        <div className="about">
            <PageHeader>About BurgersGo</PageHeader>
            <PageDescription>
                <p>
                    BurgersGo is the new way to get your burger cravings filled! Customize every aspect of your burger to your liking, including buns, protein, toppings, and sauces, add on any sides you'd like, and have it delivered right to your door fresh off the grill!
                </p>
            </PageDescription>
            
            <div>
                <SectionCard title="History" imgSrc="https://cdn.vox-cdn.com/thumbor/FVplPmYIVw19ELpnnGdm9-lKy10=/0x0:4000x2649/1200x900/filters:focal(1680x1005:2320x1645)/cdn.vox-cdn.com/uploads/chorus_image/image/61065127/shutterstock_304005038.0.jpg">
                    <>
                    Started as a small, humble course project by 4 like-minded students from the University of Toronto operating out of a grandma's kitchen, BurgersGo has grown into a formidable new force, disrupting the restaurant scene of Toronto, Canada. We now have multiple, full-scale kitchens all around the GTA, employing over 69 bright people in operations, fulfillment, and technology. 
                    </>
                </SectionCard>
                <SectionCard title="Food Sources" imgSrc="https://www.theglobeandmail.com/resizer/eWjthFjIpcc3qDOyjTn0KpyFQRU=/1200x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/AKIOTI4YGVH43MGCPC623SQESM.jpg">
                    <>
                    As a food company, we strive to give our customers the best possible experience with anything that goes into their mouths -- and that starts from the raw ingredients we make our food with. Sourced fresh from Canadian farms with the highest quality, we'll make you love food again. 
                    </>
                </SectionCard>
                <SectionCard title="Kitchens" imgSrc="https://media.giphy.com/media/3ofSBhofmNP8z9VU0U/giphy.gif">
                    <>
                    Our burgers are known for the endless combinations and customizability, and you can thank our kitchens for that! We work hard to make sure that everything coming out of our kitchens is a masterpiece in itself. We started BurgersGo in order to better serve people with dietary restrictions as well, and we strive to do exactly that: We keep all possible allergens and dietary restricted products separate, and we make sure what you get is exactly what you wanted -- plus some extra love and affection.  
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default about;
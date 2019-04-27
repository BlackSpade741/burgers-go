import React from 'react';

import './Sides.css';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const sides = () => {
    return (
        <div className="sides">
            <PageHeader>Sides</PageHeader>

            <PageDescription>
                <p>
                Make it your perfect meal by adding some of our tasty sides and drinks to your meal. Gluten free, vegan/vegetarian, and halal options available. 
                </p>
            </PageDescription>

            <div>
                <SectionCard title="Sea Salt Fries" imgSrc="https://recipes.timesofindia.com/photo/54659021.cms">
                    <>
                    Crispy potato fries tossed with sea salt. The best side to go with your burger, period.  
                    
                    Ingredients: Potatoes, sea salt. 
                    </>
                </SectionCard>

                <SectionCard title="Sea Salt Fries" imgSrc="https://recipes.timesofindia.com/photo/54659021.cms">
                    <>
                    Crispy potato fries tossed with sea salt. The best side to go with your burger, period.  
                    
                    Ingredients: Potatoes, sea salt. 
                    </>
                </SectionCard>
                <SectionCard title="Sea Salt Fries" imgSrc="https://recipes.timesofindia.com/photo/54659021.cms">
                    <>
                    Crispy potato fries tossed with sea salt. The best side to go with your burger, period.  
                    
                    Ingredients: Potatoes, sea salt. 
                    </>
                </SectionCard>
                <SectionCard title="Sea Salt Fries" imgSrc="https://recipes.timesofindia.com/photo/54659021.cms">
                    <>
                    Crispy potato fries tossed with sea salt. The best side to go with your burger, period.  
                    
                    Ingredients: Potatoes, sea salt. 
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default sides;
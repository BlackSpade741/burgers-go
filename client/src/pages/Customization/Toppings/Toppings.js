import React from 'react';

import './Toppings.css';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const toppings = () => {
    return (
        <div className="toppings">
            <PageHeader>Toppings</PageHeader>

            <PageDescription>
                <p>
                Want to spice up your burger even more with other toppings? We've got you covered! We offer a great selection of cheeses, meats, and relishes to take your burger to the next level. Vegan/vegetarian and halal options available. 
                </p>
            </PageDescription>

            <div>
                <SectionCard title="Bacon" imgSrc="https://boatcafe.co.nz/web/image/product.template/26/image">
                    <>
                    Crispy bacon for that crunch. We love bacon so much.  
                    
                    Ingredients: Pork bacon. 
                    </>
                </SectionCard>

                <SectionCard title="Bacon" imgSrc="https://boatcafe.co.nz/web/image/product.template/26/image">
                    <>
                    Crispy bacon for that crunch. We love bacon so much.  
                    
                    Ingredients: Pork bacon. 
                    </>
                </SectionCard>

                <SectionCard title="Bacon" imgSrc="https://boatcafe.co.nz/web/image/product.template/26/image">
                    <>
                    Crispy bacon for that crunch. We love bacon so much.  
                    
                    Ingredients: Pork bacon. 
                    </>
                </SectionCard>

                <SectionCard title="Bacon" imgSrc="https://boatcafe.co.nz/web/image/product.template/26/image">
                    <>
                    Crispy bacon for that crunch. We love bacon so much.  
                    
                    Ingredients: Pork bacon. 
                    </>
                </SectionCard>
            </div>

                
        </div>
    );
}

export default toppings;
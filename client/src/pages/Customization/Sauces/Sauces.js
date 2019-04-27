import React from 'react';

import './Sauces.css';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const sauces = () => {
    return (
        <div className="sauces">
            <PageHeader>Sauces</PageHeader>

            <PageDescription>
                <p>
                Top up your burger with your favourite sauces and condiments, and give it that extra little love of flavour. Yes, we do have the Big Mike secret sauce. 
                </p>
            </PageDescription>

            <div>
                <SectionCard title="Ketchup" imgSrc="https://www.thepetitecook.com/wp-content/uploads/2015/08/ketchup-the-petite-cook.jpg">
                    <>
                    Our signature homemade ketchup. You won't regret putting some of this on your burger!   
                    
                    Ingredients: Tomatoes. 
                    </>
                </SectionCard>

                <SectionCard title="Ketchup" imgSrc="https://www.thepetitecook.com/wp-content/uploads/2015/08/ketchup-the-petite-cook.jpg">
                    <>
                    Our signature homemade ketchup. You won't regret putting some of this on your burger!   
                    
                    Ingredients: Tomatoes. 
                    </>
                </SectionCard>
                <SectionCard title="Ketchup" imgSrc="https://www.thepetitecook.com/wp-content/uploads/2015/08/ketchup-the-petite-cook.jpg">
                    <>
                    Our signature homemade ketchup. You won't regret putting some of this on your burger!   
                    
                    Ingredients: Tomatoes. 
                    </>
                </SectionCard>
                <SectionCard title="Ketchup" imgSrc="https://www.thepetitecook.com/wp-content/uploads/2015/08/ketchup-the-petite-cook.jpg">
                    <>
                    Our signature homemade ketchup. You won't regret putting some of this on your burger!   
                    
                    Ingredients: Tomatoes. 
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default sauces;
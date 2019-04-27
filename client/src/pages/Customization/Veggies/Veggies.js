import React from 'react';

import './Veggies.css';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const veggies = () => {
    return (
        <div className="veggies">
            <PageHeader>Veggies</PageHeader>

            <PageDescription>
                <p>
                Get your veg on! Fresh produce every single day, with yummy options you may never even have heard of! You can choose from a selection of fresh veggies or prepared salads and coleslaws. 
                </p>
            </PageDescription>

            <div>
                <SectionCard title="Lettuce" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/vegetable-organic-lettuce-romaine-1_1024x1024.jpg?v=1480677323">
                    <>
                    Fresh iceberg lettuce from your local farms. 
                    
                    Ingredients: Lettuce
                    </>
                </SectionCard>

                <SectionCard title="Lettuce" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/vegetable-organic-lettuce-romaine-1_1024x1024.jpg?v=1480677323">
                    <>
                    Fresh iceberg lettuce from your local farms. 
                    
                    Ingredients: Lettuce
                    </>
                </SectionCard>

                <SectionCard title="Lettuce" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/vegetable-organic-lettuce-romaine-1_1024x1024.jpg?v=1480677323">
                    <>
                    Fresh iceberg lettuce from your local farms. 
                    
                    Ingredients: Lettuce
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default veggies;
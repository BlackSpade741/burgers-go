import React from 'react';

import './Proteins.css';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const proteins = () => {
    return (
        <div className="proteins">
            <PageHeader>Proteins</PageHeader>

            <PageDescription>
                <p>
                This is what you came here for! We offer a variety of meats, tofu, seafood, and veggie options for your burger patty, all sourced fresh locally. You'll love the sizzle and the juicy insides! Gluten free, vegan/vegetarian, and halal options available.
                </p>
            </PageDescription>

            <div>
                <SectionCard title="B2G Classic Beef Patty" imgSrc="https://cdn.shopify.com/s/files/1/0236/6881/products/Greensbury-Product-Beef-Patties-Cooked-1600x1067_feb950a4-0f37-4e49-9d01-a6c42f7fc75a_1500x.jpg?v=1536248002">
                    <>
                    Our classic 50/50 beef patty, cooked to your liking. We're salivating too. 
                    
                    Ingredients: Beef. 
                    </>
                </SectionCard>

                <SectionCard title="Angus Patty" imgSrc="https://cdn.shopify.com/s/files/1/0236/6881/products/Greensbury-Product-Beef-Patties-Cooked-1600x1067_feb950a4-0f37-4e49-9d01-a6c42f7fc75a_1500x.jpg?v=1536248002">
                    <>
                    Our classic 50/50 beef patty, cooked to your liking. We're salivating too. 
                    
                    Ingredients: Beef. 
                    </>
                </SectionCard>

                <SectionCard title="Barbecue Beef Patty" imgSrc="https://cdn.shopify.com/s/files/1/0236/6881/products/Greensbury-Product-Beef-Patties-Cooked-1600x1067_feb950a4-0f37-4e49-9d01-a6c42f7fc75a_1500x.jpg?v=1536248002">
                    <>
                    Our classic 50/50 beef patty, cooked to your liking. We're salivating too. 
                    
                    Ingredients: Beef. 
                    </>
                </SectionCard>

                <SectionCard title="Cheesy Beef Patty" imgSrc="https://cdn.shopify.com/s/files/1/0236/6881/products/Greensbury-Product-Beef-Patties-Cooked-1600x1067_feb950a4-0f37-4e49-9d01-a6c42f7fc75a_1500x.jpg?v=1536248002">
                    <>
                    Our classic 50/50 beef patty, cooked to your liking. We're salivating too. 
                    
                    Ingredients: Beef. 
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default proteins;
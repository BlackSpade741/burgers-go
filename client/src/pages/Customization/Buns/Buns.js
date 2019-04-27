import React from 'react';

import "./Buns.css";

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageDescription from '../../../components/PageDescription/PageDescription';
import SectionCard from '../../../components/SectionCard/SectionCard'

const buns = () => {
    return (
        <div className="buns">
            <PageHeader>
                Buns
            </PageHeader>

            <PageDescription>
                <p>
                    Freshly baked from our oven every day, our buns are made from the best ingredients. Gluten free and vegan options available. 
                </p>
            </PageDescription>

            <div>
                <SectionCard title="B2G Classic Potato Bun" imgSrc="https://d3cizcpymoenau.cloudfront.net/images/legacy/37574/CVR_SFS_potato_sandwich_rolls_CLR-15.jpg">
                    <>
                    Our classic fluffy potato bun, topped with toasted sesame seeds.
                    
                    Ingredients: Flour, bread flour, potato, milk, sugar, egg, yeast, butter. 
                    </>
                </SectionCard>

                <SectionCard title="Brioche Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>

                <SectionCard title="Ciabatta Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>

                <SectionCard title="Pretzel Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>
                
                <SectionCard title="Rice Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>

                <SectionCard title="Gluten-free Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>

                <SectionCard title="Lettuce Bun" imgSrc="https://cdn.shopify.com/s/files/1/1078/0310/products/bread-bread-la-brioche-buns-6ct-bag-1_1024x1024.jpg?v=1480679709">
                    <>
                    Beautiful brioche bun, definitely one of our favourites!
                    
                    Ingredients: water, yeast, milk, sugar, flour, egg. 
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default buns;
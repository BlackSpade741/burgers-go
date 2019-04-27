import React from 'react';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageDescription from '../../components/PageDescription/PageDescription';
import SectionCard from '../../components/SectionCard/SectionCard'

import './Customization.css'

const customization = () => {
    return (
        <div className="customization">
            <PageHeader>
                Customization Options
            </PageHeader>

            <PageDescription>
                <p>
                    Each one of our customization options are carefully selected, locally sourced, and made to your liking. So pile on as many toppings as you want and get those saucy sauces -- no regrets here!
                </p>
            </PageDescription>

            <div>
                <SectionCard title="Buns" imgSrc="https://www.daringgourmet.com/wp-content/uploads/2018/07/Hamburger-Buns-1-square.jpg" to="/buns">
                    <>
                        Freshly baked from our oven every day, our buns are made from the best ingredients. Gluten free and vegan options available. 
                    </>
                </SectionCard>

                <SectionCard title="Proteins" imgSrc="https://cdn.shopify.com/s/files/1/2181/5655/products/groundbeef_ecomm-122_crop_border_web_2000x.jpg?v=1537887360" to="/proteins">
                    <>
                    This is what you came here for! We offer a variety of meats, tofu, seafood, and veggie options for your burger patty, all sourced fresh locally. You'll love the sizzle and the juicy insides! Gluten free, vegan/vegetarian, and halal options available. 
                    </>
                </SectionCard>

                <SectionCard title="Veggies" imgSrc="http://mediad.publicbroadcasting.net/p/wamc/files/styles/medium/public/201401/fruit___vegs_assortment_0.jpg" to="/veggies">
                    <>
                        Get your veg on! Fresh produce every single day, with yummy options you may never even have heard of! You can choose from a selection of fresh veggies or prepared salads and coleslaws. 
                    </>
                </SectionCard>

                <SectionCard title="Other Toppings" imgSrc="https://www.gbolamfoods.co.uk/images/cheese-selection-p313-443_medium.jpg" to="/toppings">
                    <>
                        Want to spice up your burger even more with other toppings? We've got you covered! We offer a great selection of cheeses, meats, and relishes to take your burger to the next level. Vegan/vegetarian and halal options available. 
                    </>
                </SectionCard>

                <SectionCard title="Sauces" imgSrc="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/5/9/0/FNM_060111-Insert-008-u_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371597483472.jpeg" to="/sauces">
                    <>
                        Top up your burger with your favourite sauces and condiments, and give it that extra little love of flavour. Yes, we do have the Big Mike secret sauce. 
                    </>
                </SectionCard>

                <SectionCard title="Sides" imgSrc="http://www.redrobinpa.com/wp-content/uploads/2017/01/sub-added-charge-300-300x254.jpeg" to="/sides">
                    <>
                        And finally, make it your perfect meal by adding some of our tasty sides and drinks to your meal. Gluten free, vegan/vegetarian, and halal options available. 
                    </>
                </SectionCard>
            </div>
        </div>
    );
}

export default customization
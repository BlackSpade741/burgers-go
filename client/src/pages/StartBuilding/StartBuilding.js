import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Tabs, Tab, Button ,Figure, Container, Row, Col} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import NavLink from "../../components/NavLink/NavLink"

import PageHeader from '../../components/PageHeader/PageHeader';
import PageDescription from '../../components/PageDescription/PageDescription';
import SectionCard from '../../components/SectionCard/SectionCard'

import './StartBuilding.css';


export class StartBuilding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            canCheckout: props.currentOrder.length !== 0
        }
    }

    ingredients = {
        type: [
            {ing:"bun", default:"bun", name:"plain", category:"pending", src:"https://d36anqfwl2xq4r.cloudfront.net/img/top-bun.png" },
            {ing:"bun", default:"bun", name:"honey", category:"pending", src:"https://stickeroid.com/uploads/pic/full-pngimg/e18736a97a9ed4a99360f0228828317606d64f0d.png" },
            {ing:"bun", default:"bun", name:"sesame seed", category:"pending", src:"http://www.clipartroo.com/images/66/bun-clipart-66514.png" },
            {ing:"bun", default:"bun", name:"tomato crunch", category:"pending", src:"https://theorganiccoup.com/v2/wp-content/uploads/2015/10/burger-top.png" },
            {ing:"bun", default:"bun", name:"panini", category:"pending", src:"https://cdn.schlotzskys.com/-/media/schlotzskys/ingredients/jalapeno-bun-top-400.png?v=1&d=20180213T144146Z" },
            {ing:"sauce", default:"sauce", name:"ketchup", category:"pending", src:"https://www.buffalowildwings.com/globalassets/modifiers/10030014-mango-habenero.png"},
            {ing:"sauce", default:"sauce", name:"teriyaki", category:"pending", src:"https://www.buffalowildwings.com/globalassets/modifiers/10030002-teriyaki.png"},
            {ing:"sauce", default:"sauce", name:"salt vinegar", category:"pending", src:"https://www.buffalowildwings.com/globalassets/modifiers/10030017-salt-vinegar.png"},
            {ing:"sauce", default:"sauce", name:"honey mustard", category:"pending", src:"https://www.buffalowildwings.com/globalassets/modifiers/10030003-bourbon-honey-mustard.png"},
            {ing:"sauce", default:"sauce", name:"parmesan garlic", category:"pending", src:"https://www.buffalowildwings.com/globalassets/modifiers/10030005-parmesan-garlic.png"},
            {ing:"veggie", default:"veggie", name:"tomato", category:"pending", src:"https://img.pngio.com/winner-clean-cut-slice-of-tomato-png-1534_819.png"},
            {ing:"veggie", default:"veggie", name:"lettuce", category:"pending", src:"https://scontent.xx.fbcdn.net/v/t1.15752-9/54217394_314419112604947_6441817359014428672_n.png?_nc_cat=104&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=6d70b67c547bb90ba9d207e24137d02c&oe=5D1340C2"},
            {ing:"veggie", default:"veggie", name:"spinach", category:"pending", src:"https://purepng.com/public/uploads/large/purepng.com-spinachvegetables-green-spinach-941524712351zszxc.png"},
            {ing:"veggie", default:"veggie", name:"pickle", category:"pending", src:"https://pngimage.net/wp-content/uploads/2018/06/pickles-png-4.png"},
            {ing:"veggie", default:"veggie", name:"onion", category:"pending", src:"http://chefspantry.com.au/wp-content/uploads/2017/05/OnionsRed_Sliced_01702.png"},
            {ing:"veggie", default:"veggie", name:"pepper-red", category:"pending", src:"https://purepng.com/public/uploads/large/purepng.com-red-pepperpepperpeppercornsspicecapsicumfoodchilired-pepper-1701527271064ehjko.png"},
            {ing:"veggie", default:"veggie", name:"pepper-hot", category:"pending", src:"https://pics.clipartpng.com/midle/Red_Chili_Pepper_PNG_Clipart-478.png"},
            {ing:"topping", default:"topping", name:"cheddar cheese", category:"pending", src:"http://www.marinefoodsexpressltd.com/wp-content/uploads/2014/07/p-1538-cheese.png"},
            {ing:"topping", default:"topping", name:"mozzarella cheese", category:"pending", src:"http://pngimg.com/uploads/cheese/cheese_PNG25309.png"},
            {ing:"topping", default:"topping", name:"swiss cheese", category:"pending", src:"http://www.wisconsincheesetalk.com/img/cheese/sliced-swiss.png"},
            {ing:"topping", default:"topping", name:"parmesan cheese", category:"pending", src:"http://pngimg.com/uploads/cheese/cheese_PNG7.png"},
            {ing:"topping", default:"topping", name:"blue cheese", category:"pending", src:"http://4.bp.blogspot.com/-1OAE0-kq5N8/UTL75FmaqjI/AAAAAAAABks/_ZIbys216M4/s1600/blue-stilton.png"},
            {ing:"patty", default:"patty", name:"beef", category:"pending", src:"https://pngimage.net/wp-content/uploads/2018/05/burger-patty-png-4.png"},
            {ing:"patty", default:"patty", name:"chicken", category:"pending", src:"https://www.mcdonalds.de/qualitaet/export/sites/default/media/img/zutaten/chickenburger-patty_gross.png"},
            {ing:"patty", default:"patty", name:"fish", category:"pending", src:"https://www.mcdonalds.com/content/dam/usa/nutrition/ingredients/regular/fish.png"},
            {ing:"patty", default:"patty", name:"double beef", category:"pending", src:"https://cuginicafe.com/wp-content/uploads/2015/12/sj-burger-patty.png"},
            {ing:"patty", default:"patty", name:"bone in grill", category:"pending", src:"https://walkertongcc.com/wp-content/uploads/2017/06/hp1-steak11.png"},
            {ing:"patty", default:"patty", name:"boneless grill", category:"pending", src:"http://www.meatlessmonday.com/images/photos/2014/10/Steak_-1024x580.png"},
            {ing:"patty", default:"patty", name:"veggie", category:"pending", src:"https://hamburgini.com/wp-content/uploads/2017/03/beef.png"},
            {ing:"patty", default:"patty", name:"t-bone", category:"pending", src:"http://hobemeats.com/wp-content/uploads/2018/08/hobemeats-steak-1024x668.png"},
            {ing:"bun", default:"bun", name:"bun buttom", category:"pending", src:"https://d301r8r2i6eqlt.cloudfront.net/wp-content/uploads/2017/04/07132453/white-bottom.png" }
        ],
        included: []
    }

    onDragOver = (e) => {
        e.preventDefault();        
    }

    onDragStart = (e, name) => {
        
        // this is a event handler, we can set data on start and get data on drop
        e.dataTransfer.setData("name", name); 
    }

    onDrop = (e, cat) => {
        e.preventDefault();
        
        let name = e.dataTransfer.getData("name");        
        
        this.ingredients.included.push(this.ingredients.type.find(x => x.name === name))

        if (cat === "pending") {
            this.ingredients.included = this.ingredients.included.filter((x) => x.name !== name)
        }

        let ingredients = this.ingredients.type.filter((ingredient) => {
            if (ingredient.name === name) {
                if (ingredient.default === "patty") {
                    this.setState({
                        canCheckout: true
                    })
                }
                (cat === "pending")? ingredient.ing = ingredient.default : ingredient.ing = cat;
            }

            return ingredient;
        });

        this.setState({
            ...this.ingredients, ingredients
        })
    }

    checkOut = (e) => {
        
        this.props.drop(this.ingredients.included)
    }

    render() {
        let tasks = {
            bun: [],
            patty: [],
            veggie: [],
            pending : [],
            sauce : [],
            topping : [],
            complete: []
        }
        
        this.ingredients.type.forEach(element => {
            tasks[element.ing].push(
                <div key={element.name} draggable className="dragable" onDragStart={(e) => this.onDragStart(e, element.name)}>                   
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src={element.src}
                        />                        
                    </Figure>
                    <Figure.Caption>
                        <h4 id="ingredient-caption">{element.name}</h4>
                    </Figure.Caption>                    
                </div>
                
            ) 
        });

        return  (
              
        <div id="burger-holder">
            <Container>
                <PageHeader>Customize Burgers</PageHeader>

                <PageDescription>
                    <p>
                    Customize your burger with your favourite sauces and condiments. Drag and drop ingredients onto your plate and checkout when you are ready. 
                    </p>
                </PageDescription>
                <Row className="bg-light" id="burger-main">
                    
                    {/** storage section */}
                    <Col id="storage" md={{span:5}} onDragOver={(e)=> this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "pending")}>
                        <h4 className="custom-header">Ingredients</h4>
                        

                        <div id="side-bar" className="product-item">

                        {/* this section is for the navbar */}

                        <Tabs  defaultActiveKey="buns" id="ingredient-tab">

                            <Tab eventKey="buns" title="Buns">
                            {tasks.bun}
                            </Tab>
                            <Tab className="each-tab" eventKey="veggies" title="Veggies">
                            {tasks.veggie}
                            </Tab>
                            <Tab className="each-tab" eventKey="patties" title="Patties">
                            {tasks.patty}
                            </Tab>
                            <Tab className="each-tab" eventKey="sauces" title="Sauces">
                            {tasks.sauce}
                            </Tab>
                            <Tab className="each-tab" eventKey="toppings" title="Toppings">
                            {tasks.topping}
                            </Tab>                            
                        </Tabs>
                        </div>  
                    </Col>
                    
                    {/** plate section */}
                    <Col id="plate"  onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, "complete")}>
                        <h4 className="custom-header">Burger</h4>
                        <div id="plate-content">  
                            {tasks.complete}
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="http://www.pngmart.com/files/8/White-Plate-PNG-Image.png"
                            />
                        </div>               
                    </Col>

                    {/* Checkout Button */}
                    <Col id="checkout" md={{offset:1.5}}>
                        <Row>
                        <p>You have {this.props.currentOrder.length} burgers in your cart.</p>
                        {
                            this.state.canCheckout ? null : (
                                <p>Add a patty first!</p>
                            )
                        }
                        

                        </Row>
                        <Row>
                        <Button id="but" variant="success" disabled={!this.state.canCheckout}  onClick={(e) => this.checkOut(e)}>
                        <span id="build"> 
                            <NavLink to="/order">
                               
                            <Figure.Image
                                width={101}
                                height={110}
                                alt="171x180"
                                src="http://cdn.onlinewebfonts.com/svg/img_550770.png"
                            />
                            <Figure.Caption>
                                <h4 id="checkout-cap">Checkout</h4>
                            </Figure.Caption>
                            </NavLink>
                        </span>                 
                        </Button>
                        </Row>
                    </Col>     
                </Row>
            </Container>
        </div>        
    ) 
  }
}

export default StartBuilding

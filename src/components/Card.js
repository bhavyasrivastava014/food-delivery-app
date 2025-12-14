import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartProvider'

export default function Card(props) {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const { addToCart } = useCart();

    let options = props.options || {};
    let priceOptions = Object.keys(options);
    let foodItem = props.foodItem || {};

    // Set default size when options are available
    useEffect(() => {
        if (priceOptions.length > 0 && !size) {
            setSize(priceOptions[0]);
        }
    }, [priceOptions, size]);

    const handleAddToCart = async () => {
        if (!size) {
            alert('Please select a size');
            return;
        }

        const cartItem = {
            id: foodItem.name + "_" + size, // Create unique id
            name: foodItem.name,
            img: foodItem.img,
            qty: parseInt(qty),
            size: size,
            price: parseInt(options[size] || 0)
        };

        await addToCart(cartItem);
        alert('Added to cart successfully!');
    };

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width":"18rem", "maxHeight":"420px" }}>
                    <img 
                        src={foodItem.img || "https://www.sanjanafeasts.co.uk/wp-content/uploads/2023/07/Paneer-Tikka-Kebabs-on-a-platter-with-fresh-naan-bread-720x720.jpg"} 
                        className="card-img-top" 
                        alt={foodItem.name || "Food Item"}
                        style={{height: "120px", objectFit: "fill"}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name || "Card title"}</h5>
                        <p className="card-text">{foodItem.description || "This is important text."}</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' value={qty} onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} > {i + 1} </option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' value={size} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data)=> {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{qty * parseInt(options[size] || 0)}/-
                            </div>
                        </div>
                        <hr />
                        <button 
                            className='btn btn-success justify-center ms-2' 
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

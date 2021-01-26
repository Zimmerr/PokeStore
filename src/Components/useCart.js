import { useEffect, useState } from 'react';

const usePokeTheme = () => {
    const [cart, setCart] = useState([]);
    //const [mountedComponent, setMountedComponent] = useState(false)

    const addNewItem = item => {
      console.log(item)
        let newCart = cart;
        newCart.push(item);
        console.log(newCart)
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
        console.log(cart);
    };

    const clearCart = () => {
      window.localStorage.removeItem('cart')
      setCart([])
    }

    useEffect(() => {
        const localCart = window.localStorage.getItem('cart');
        
        localCart && setCart(JSON.parse(localCart))
    }, []);
    return [cart, addNewItem, clearCart]
};

export default usePokeTheme;
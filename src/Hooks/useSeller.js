import { useEffect, useState } from "react";

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false)
    const [sellerLoader, setSellerLoader] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsSeller(data.isSeller);
                setSellerLoader(false)
            })
    }, [email])
    return [isSeller, sellerLoader];
}

export default useSeller;
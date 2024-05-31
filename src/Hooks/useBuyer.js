import { useEffect, useState } from "react";

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false)
    const [buyerLoader, setBuyerLoader] = useState(true)
    useEffect(() => {
        fetch(`https://recarnation-react-server.vercel.app/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsBuyer(data.isBuyer);
                setBuyerLoader(false)
            })
    }, [email])

    return [isBuyer, buyerLoader];
}

export default useBuyer;
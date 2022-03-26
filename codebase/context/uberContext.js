import { createContext, useState, useEffect} from "react";
export const UberContext = createContext();




export const UberProvider = ({children}) => {
    const [pickup,setPickup] = useState('');
    const [dropoff,setDropoff] = useState('');
    const [pickupCoordinates,setPickupCoordinates] = useState();
    const [dropoffCoordinates,setDropoffCoordinates] = useState();

    const createLocaitonCoordinatePromise = (locationName, locationType) => {
        return new Promise(async(resolve,reject => {
            const response = await fetch("api/map/getLocationCoordinates", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    location: locationName,
                })
            })
            const data = await response.json();
    
            if(data.message = "success")
            {
                switch(locationType)
                {
                        case "pickup":
                        setPickupCoordinates(data.data);
                        break;
                    case "dropoff":
                        setDropoffCoordinates(data.data);
                        break;
                }
                resolve();
            }else{
                reject();
            }
        }))
    }

    useEffect(() => {
        if(pickup && dropoff)
        {
            ;(async () => (
                await Promise.all([
                    createLocaitonCoordinatePromise(pickup, "pickup"),
                    createLocaitonCoordinatePromise(dropoff,"dropoff"),
                ])
            ))()
        } else return
    },[pickup,dropoff])

    return(
        <UberContext.Provider value={{pickup,setPickup, dropoff, setDropoff, pickupCoordinates, setPickupCoordinates,dropoffCoordinates, setDropoffCoordinates}}> {children} </UberContext.Provider>
    )
}
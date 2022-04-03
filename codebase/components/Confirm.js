import React from "react";
import { useContext } from "react";
import { UberContext } from "../context/uberContext";
import RideSelector from "./RideSelector";
const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll scrollbar-hide`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
};
const Confirm = () => {
  const { currentAccount, pickup, dropoff, price, selectedRide } =
    useContext(UberContext);
  const storeTripDetails = async (pickup, dropoff) => {
    try {
      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        <RideSelector />
      </div>
      <div className={style.confirmButtonContainer}>
        <div
          className={style.confirmButton}
          onClick={() => storeTripDetails(pickup, dropoff)}
        >
          Confirm UberX
        </div>
      </div>
    </div>
  );
};

export default Confirm;

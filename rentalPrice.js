
function calculatePrice(pickupDate, dropoffDate, carType, userAge) {
  const pickupDropoffDate = getPickupDropoffDate(pickupDate, dropoffDate);
  const season = getSeason(pickupDate, dropoffDate);
  if (userAge < 18) {
      return "Driver too young - cannot rent a car";
  }

  if (userAge <= 21 && carType !== "Compact") {
      return "Drivers 21 y/o or less can only rent Compact cars";
  }

  let rentalprice = userAge * pickupDropoffDate;

  if (carType === "Racer" && userAge <= 25) {
    if (season === "High"){
      rentalprice *= 1.5;
    }else{
      rentalprice *= 1.0;
    }
} 
  if (season === "High" && userAge >25 ) {
    rentalprice *= 1.15;
  } else if (season === "Low" && pickupDropoffDate > 10   ) {
    rentalprice *= 0.9;
  }



  return '$' + rentalprice.toFixed(0);
}


function getPickupDropoffDate(pickupDate, dropoffDate) {
  const oneDay = 24 * 60 * 60 * 1000; 
  const firstDate = new Date(pickupDate);
  const secondDate = new Date(dropoffDate);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSeason(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  const start = 3; 
  const end = 9;

  const pickupMonth = pickup.getMonth();
  const dropoffMonth = dropoff.getMonth();

  if (
      (pickupMonth >= start && pickupMonth <= end) ||
      (dropoffMonth >= start && dropoffMonth <= end) ||
      (pickupMonth < start && dropoffMonth > end)
  ) {
      return "High";
  } else {
      return "Low";
  }
}

function isLongRental(rentalDays) {
  return rentalDays > 10;
}

exports.calculatePrice = calculatePrice;
exports.isLongRental = isLongRental;
exports.getSeason = getSeason;
exports.getPickupDropoffDate = getPickupDropoffDate;
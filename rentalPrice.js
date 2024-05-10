
function calculatePrice(pickupDate, dropoffDate, carType, userAge) {
  const pickupDropoffDate = getPickupDropoffDate(pickupDate, dropoffDate);
  const season = getSeason(pickupDate, dropoffDate);
//Rental cars are categorized into 4 classes: Compact, Electric, Cabrio, Racer.s
//The minimum rental price per day is equivalent to the age of the driver.
  if (userAge < 18) {
      return "Driver too young - cannot quote the price";
  }

  if (userAge <= 21 && carType !== "Compact") {
      return "Drivers 21 y/o or less can only rent Compact cars";
  }

  let rentalprice = userAge * pickupDropoffDate;

  if (carType === "Racer" && userAge <= 25 && season === "High") {
      rentalprice *= 1.5;
  } 
  
  if (season === "High" ) {
    rentalprice *= 1.15;
  }

  if (pickupDropoffDate > 10 && season === "Low" ) {
    rentalprice *= 0.9;
  }
  return '$' + rentalprice;
}


function getPickupDropoffDate(pickupDate, dropoffDate) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(pickupDate);
  const secondDate = new Date(dropoffDate);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSeason(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  const start = 4; 
  const end = 10;

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
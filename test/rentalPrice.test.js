const rental = require('../rentalPrice');
//Rental cars are categorized into 4 classes: Compact, Electric, Cabrio, Racer.
//The minimum rental price per day is equivalent to the age of the driver.
test('Driver under 18 cannot rent a car', () => {
    expect(rental.calculatePrice('2024-01-01', '2024-02-02', 'Compact', 15))
    .toBe('Driver too young - cannot quote the price');
});

test('Driver under 21 can rent only compact car', () => {
    expect(rental.calculatePrice('2024-01-03', '2024-02-02', 'Compact', 19))
    .toBe('$530.1');
});

test('Driver under 21 can rent only compact car', () => {
    expect(rental.calculatePrice('2024-01-03', '2024-02-02', 'Racer', 19))
    .toBe('Drivers 21 y/o or less can only rent Compact cars');
}); 

test('24 year old rents a racer car from 2024-05-03 to 2024-06-01', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-06-01', 'Racer', 24))
    .toBe('$1080');
});

test('5 days is long rental', () => {
    expect(rental.isLongRental(5))
    .toBe(false);
});

test('High season, price is increased by 15%', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-06-01', 'Electric', 30))
    .toBe("$1035");
})

test('11 days is long rental', () => {
    expect(rental.isLongRental(11))
    .toBe(true);
});

test('High or Low Season', () => {
    expect(rental.getSeason('2024-01-01', '2024-02-02'))
    .toBe('Low');
});
test('High or Low Season', () => {
    expect(rental.getSeason('2024-04-01', '2024-05-02'))
    .toBe('High');
});

test('NRenting in High season, price is increased by 15%', () => {
    expect(rental.calculatePrice('2024-11-03', '2024-12-01', 'Racer', 40))
    .toBe('$1334');
})

test('Renting in High season, price is increased by 15%', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-06-01', 'Racer', 40))
    .toBe('$1380');
})
//
test('For Racers the price is increared by 50% if the driver is 25 years old or younger, except low season', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-06-01', 'Racer', 24))
    .toBe('$1080');
})
//
test('Renting in Low season for more than 10 days price is decresed by 10%', () => {
    expect(rental.calculatePrice('2024-10-03', '2024-10-14', 'Racer', 30))
    .toBe('');
})
//
test('Renting in Low season for 9 days', () => {
    expect(rental.calculatePrice('2024-10-03', '2024-10-12', 'Racer', 30))
    .toBe('243');
})

test('How many days is the car rented', () => {
    expect(rental.getPickupDropoffDate('2024-01-01', '2024-02-02'))
    .toBe(33);
});

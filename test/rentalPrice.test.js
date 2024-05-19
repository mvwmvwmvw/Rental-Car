const rental = require('../rentalPrice');
//Rental cars are categorized into 4 classes: Compact, Electric, Cabrio, Racer.
test('Driver under 18 cannot rent a car', () => {
    expect(rental.calculatePrice('2024-01-01', '2024-02-02', 'Compact', 15))
    .toBe('Driver too young - cannot rent a car');
});

test('Driver under 21 can rent only compact car', () => {
    expect(rental.calculatePrice('2024-01-03', '2024-02-02', 'Compact', 19))
    .toBe('$530');
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

test('High season, 30 years, 15% increase, 8 days', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-05-10', 'Electric', 30))
    .toBe("$276");
})
test('High season, 30 years, 15% increase, 11 days', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-05-13', 'Electric', 30))
    .toBe("$379");
})

test('Low season, 30 years, 8 days', () => {
    expect(rental.calculatePrice('2024-12-03', '2024-12-10', 'Electric', 30))
    .toBe("$240");
})
test('Low season, 30 years, 10% decrease, 11 days', () => {
    expect(rental.calculatePrice('2024-12-03', '2024-12-13', 'Electric', 30))
    .toBe("$297");
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

test('Renting in High season, price is increased by 15%, 9 days', () => {
    expect(rental.calculatePrice('2024-11-03', '2024-11-11', 'Racer', 40))
    .toBe('$360');
})

test('Renting in High season, price is increased by 15%', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-05-11', 'Racer', 40))
    .toBe('$414');
})

test('For Racers the price is increared by 50% if the driver is 25 years old or younger, except low season', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-05-11', 'Racer', 24))
    .toBe('$324');
})

test('Low season, 24, 9 days', () => {
    expect(rental.calculatePrice('2024-11-03', '2024-11-11', 'Racer', 24))
    .toBe('$216');
})

test('Renting in Low season for more than 10 days price is decresed by 10%', () => {
    expect(rental.calculatePrice('2024-12-04', '2024-12-15', 'Compact', 30))
    .toBe("$324");
})


test('License less than a year', () => {
    expect(rental.calculatePrice('2024-01-01', '2024-02-02', 'Compact', 25, 0.5))
    .toBe("Drivers license held for less than a year cannot rent a car");
});

test('License less than two years', () => {
    expect(rental.calculatePrice('2024-06-01', '2024-06-10', 'Compact', 25, 1.5))
    .toBe("$475");
});



test('How many days is the car rented', () => {
    expect(rental.getPickupDropoffDate('2024-01-01', '2024-02-02'))
    .toBe(33);
});

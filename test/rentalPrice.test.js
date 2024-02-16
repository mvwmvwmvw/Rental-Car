const rental = require('../rentalPrice');

test('Driver under 18 cannot rent a car', () => {
    expect(rental.calculatePrice('2024-01-01', '2024-02-02', 'Compact', 15))
    .toBe('Driver too young - cannot quote the price');
});

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
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles');
}); 
test('24 year old rents a racer car from 2024-05-03 to 2024-06-01', () => {
    expect(rental.calculatePrice('2024-05-03', '2024-06-01', 'Racer', 24))
    .toBe('$1080');
});

test('5 days is not long rental', () => {
    expect(rental.isLongRental(5))
    .toBe(false);
});

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

test('How many days is the car rented', () => {
    expect(rental.getPickupDropoffDate('2024-01-01', '2024-02-02'))
    .toBe(33);
});

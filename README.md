# myCalculator
Calculator made with JavaScript

I made this project because I wanted to improve my JavaScript skills and see if I could do it. At first I found out that in the past you could use eval to solve calculations from a string. Nowadays Firefox (at least in console) and Edge block eval so I had to build my own logic in order to solve the calculation.

Figuring out what operators you could use with what combination took some time. For example while counting factorials one can only use positive integer values. Some valid inputs I decided not to allow, for example 9!!, 3^3^3 and (2+2)(2+2) are not allowed but 3^(3^3) and (2+2)*(2+2) are allowed.

Page layout was something that I used in an earlier project where I practiced responsive design and started using that layout for other practice projects.

Testing was mostly done with Firerfox web console while I programmed different functions. Return values and different intermediary values were logged from the functions in order to see that they were correct. Later I wrote Jest tests and wrote some improvements to the JavaScript with the help from Jest test feedback.

Floating point problem I tried to solve in additions, subtractions and multiplications. For additions and subtractions I first converted values into integers and after performing the calculation turned them back into decimal numbers. For multiplications the product is calculated and unnecessary decimals are cut away.

```JavaScript
console.log(0.0003*10000);
console.log(Math.round(0.0003*10000));
```

```JavaScript
for (let i = 1; i < 100; i++) {
  for (let j = 1; j < 8; j++) {
    console.log(i / 10**j);
  }
}
```

This was a good practice project. Some improvements could be made, for example rounding of longer decimal numbers, but for now this is good.
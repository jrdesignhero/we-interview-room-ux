# WestElm Interview - Room UX

Interview project built in plain vanilla js using parcel. Using bundler to show my experience with workflow similar to WE dev workflow with Adobe Target.

## Usage

1. Go to https://www.potterybarn.com/shop/furniture/sofa-collections/big-sur-square-sofas/
2. Open the browser dev tools console and paste the following into the console window:

```javascript
let jrSetupScript = document.createElement('script');
jrSetupScript.src="https://jrdesignhero.github.io/we-interview-room-ux/we-setup.js";
document.querySelector("body").appendChild(jrSetupScript);
```
3. Scroll to the red highlighted product in the grid.
4. Click the "Big Sur Square Arm Leather Sofa" product and engage in the new UX. Observe the rooms change with each click.

![](https://i.imgur.com/l2nenWY.gif)

** the original experience was hijacked by this script and new UI was implemented to give the user a new experience.

function Serve(dessertCount){
    dessertCount = dessertCount || 3;
    let dessert = "cookie macaroon toffee bonbon sweet roll bear claw lollipop cupcake chocolate cake sesame snaps oat bar jelly caramels marshmallow lemon drops candy canes donut icing muffin pudding biscuit croissant sugar plum dragee beans carrot pie fruitcake wafer marzipan tootsie gummi bears powder cotton apple jelly-o gummies danish cheesecake gingerbread brownie pastry tart chups jujubes ice cream topping halvah caramel checkerboard cake cheesecake brownies chocolate brownie chip cookie chocolate-covered bacon potato chips pudding cobbler coconut congo bar corn cottage cupcake cupcone banana pudding split bananas dark white cookies blondie boston cream pie brown betty brownie bundt cake butterscotch fried coke dough ice cream frozen yogurt fudge funnel cake scotcheroos ice island cake snack snickerdoodles snickers stack strawberry delight shortcake sundae banana bear claw black cherry walnut blue moon blueberries blueberry pie brownie nut butter pecan bosenberry bubblegum butterscotch raspberry blackberry split bacon-flavored barbeque brownie buttercup pancake waffle crumble apple apricot avocado banana bilberry blackberry blackcurrant blueberry boysenberry cherry cloudberry coconut cranberry cucumber custard apple damson date dragonfruit durian elderberry fig goji berry gooseberry grape raisin grapefruit huckleberry kiwifruit lemon lime mango cantaloupe honeydew watermelon mulberry nectarine orange tangerine papaya peach pear pineapple";
    let desserts = dessert.split(' ');
    return Array.from(
        {length:dessertCount}, a=>desserts[Math.floor(Math.random()*desserts.length)]
    ).join('-') + "-" + Math.floor(Math.random()*10000);
}


module.exports = {
    Serve
}
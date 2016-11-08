var shirtPrice = 10.00;
var shirtPriceXXL = 12.00;
var goldCardMember = false;
var now = Date.now();
var earlyBird = new Date(2016, 5, 1).getTime();
var earlyDiscount = earlyBird < now ? 5 : 0;

var priceElems = {
    totalPrice: document.getElementById('total-price'),
    campFee: document.getElementById('camp-fee'),
    totalParticipants: document.getElementById('total-participants'),
    totalShirts: document.getElementById('shirt-count'),
    shirtsPrice: document.getElementById('shirts-price')
}

var shirtElems = {
    xxl: document.getElementById("xxl-shirt-sizes"),
    xl: document.getElementById("xl-shirt-sizes"),
    lg: document.getElementById("lg-shirt-sizes"),
    md: document.getElementById("md-shirt-sizes"),
    sm: document.getElementById("sm-shirt-sizes"),
    ylg: document.getElementById("ylg-shirt-sizes"),
    ymd: document.getElementById("ymd-shirt-sizes")
}


var shirts = {
    totalPrice: 0,
    total: 0,
    sizes: {
        xxl: 0,
        xl: 0,
        lg: 0,
        md: 0,
        sm: 0,
        ylg: 0,
        ymd: 0
    }
}
function resetPrices() {
    shirts = {
        totalPrice: 0,
        total: 0,
        sizes: {
            xxl: 0,
            xl: 0,
            lg: 0,
            md: 0,
            sm: 0,
            ylg: 0,
            ymd: 0
        }
    }
}

function toggleGoldCard() {
    goldCardMember = !goldCardMember;
    updatePrices();
}

function addShirt(currentUser) {
    var validSize = shirts.sizes[currentUser.tShirt];
    if (validSize === 0) {
        validSize = true;
    }
    if (!validSize) {
        return;
    }
    shirts.total++;
    shirts.sizes[currentUser.tShirt]++;
}

function updatePrices() {
    var camp = db.getCamp(user.camp);
    var pp = camp.price - earlyDiscount;
    for (var size in shirts.sizes) {
        if (size === "xxl") {
            shirts.totalPrice += shirts.sizes[size] * shirtPriceXXL;
        } else {
            shirts.totalPrice += shirts.sizes[size] * shirtPrice;
        }
    }

    if (goldCardMember) {
        formData.discount = 5;
    } else {
        formData.discount = 0;
    }

    formData.participants = formData.participants || {};
    var totalParticipants = 0;;

    for (var key in formData.participants) {
        var participant = formData.participants[key];

        if (participant.adult != 'true' && participant.denLeader != 'true') {
            totalParticipants++;
        }
    }

    var campFee = pp - formData.discount;
    registration.update({
        totalParticipants: totalParticipants,
        totalPrice: totalParticipants * (pp - formData.discount) + shirts.totalPrice,
        campFee: campFee,
				shirts: shirts
    }, function (err) {
        if (err) { console.log(err); }
        draw();
    })
}

function draw() {
    for (var key in shirts.sizes) {
        var quantity = shirts.sizes[key];
        var elem = shirtElems[key];
        elem.textContent = quantity;
    }

    for (var key in priceElems) {
        var value = formData[key];
        priceElems[key].textContent = value;
    }
}
function Total() {
    var that= this;

    this.totalBreakfast = new TotalCategory(0,0,0,0);
    this.totalLunch = new TotalCategory(0,0,0,0);
    this.totalDiner = new TotalCategory(0,0,0,0);
    this.totalSnack = new TotalCategory(0,0,0,0);
    this.totalAll = new TotalCategory(0,0,0,0);

    this.nbBreakfast = 0;
    this.nbLunch = 0;
    this.nbDiner = 0;
    this.nbSnack = 0;
    this.nbAll = 0;

    this.incrementCategory= function(weight, energy, energy100g, category) {

        switch (category){

            case ("Breakfast"):
                that.totalBreakfast.totalWeigh += weight;
                that.totalBreakfast.totalEnergy += energy;
                that.totalBreakfast.totalEnergy100g += energy100g;
                that.nbBreakfast++;
                that.totalBreakfast.averagelEnergy100g = that.totalBreakfast.totalEnergy100g / that.nbBreakfast;
                break;

            case ("Lunch"):
                that.totalLunch.totalWeigh += weight;
                that.totalLunch.totalEnergy += energy;
                that.totalLunch.totalEnergy100g += energy100g;
                that.nbLunch++;
                that.totalLunch.averagelEnergy100g = that.totalLunch.totalEnergy100g / that.nbLunch;
                break;

            case ("Diner"):
                that.totalDiner.totalWeigh += weight;
                that.totalDiner.totalEnergy += energy;
                that.totalDiner.totalEnergy100g += energy100g;
                that.nbDiner++;
                that.totalDiner.averagelEnergy100g = that.totalDiner.totalEnergy100g / that.nbDiner;
                break;

            case ("Snack"):
                that.totalSnack.totalWeigh += weight;
                that.totalSnack.totalEnergy += energy;
                that.totalSnack.totalEnergy100g += energy100g;
                that.nbSnack++;
                that.totalSnack.averagelEnergy100g = that.totalSnack.totalEnergy100g / that.nbSnack;
                break;
        }

        that.totalAll.totalWeigh += weight;
        that.totalAll.totalEnergy += energy;
        that.totalAll.totalEnergy100g += energy100g;
        that.nbAll++;
        that.totalAll.averagelEnergy100g = that.totalAll.totalEnergy100g / that.nbAll;

    };


//    this.toString= function() {
//        return 'Shape at '+that.x+', '+that.y;
//    };
}

function TotalCategory(totalWeight, totalEnergy, totalEnergy100g) {
    this.totalWeigh = totalWeight;
    this.totalEnergy = totalEnergy;
    this.totalEnergy100g = totalEnergy100g;
    this.averagelEnergy100g = 0;
}
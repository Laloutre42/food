function Total() {
    var that= this;

    this.totalBreakfast = new TotalCategory(0,0,0);
    this.totalLunch = new TotalCategory(0,0,0);
    this.totalDiner = new TotalCategory(0,0,0);
    this.totalSnack = new TotalCategory(0,0,0);
    this.totalAll = new TotalCategory(0,0,0);

//    this.toString= function() {
//        return 'Shape at '+that.x+', '+that.y;
//    };

    this.incrementCategory= function(weight, energy, energy100g, category) {

        switch (category){

            case ("BREAKFAST"):
                that.totalBreakfast.totalWeigh += weight;
                that.totalBreakfast.totalEnergy += energy;
                break;

            case ("LUNCH"):
                that.totalLunch.totalWeigh += weight;
                that.totalLunch.totalEnergy += energy;
                break;

            case ("DINER"):
                that.totalDiner.totalWeigh += weight;
                that.totalDiner.totalEnergy += energy;
                break;

            case ("SNACK"):
                that.totalSnack.totalWeigh += weight;
                that.totalSnack.totalEnergy += energy;
                break;
        }

        that.totalAll.totalWeigh += weight;
        that.totalAll.totalEnergy += energy;

    };
}

function TotalCategory(totalWeight, totalEnergy, totalEnergy100g) {
    this.totalWeigh = totalWeight;
    this.totalEnergy = totalEnergy;
    this.totalEnergy100g = totalEnergy100g;
}
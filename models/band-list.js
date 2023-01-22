const Band = require('./band');

class BandList {
    constructor() {}

    async addBand(name) {
        const band = await Band.create({ name });   
        return band;
    }

    async removeBand(id) {
        const band = await Band.findById(id);
        await band.delete();
    }

    async getBands() {
        
        const bands = await Band.find();
        return bands;

    }

    async increaseVotes(id) {
        console.log(id);
        const band = await Band.findById(id);
        await band.incrementVotes();
    }

    async changeName(id, newName) {
        const band = await Band.findById(id);
        band.name = newName;
        await band.save();
    }



}

module.exports = BandList;
const { Schema, model } = require('mongoose');

const BandSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    // Votos que se van ingrementando
    votes: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
});

// Modificar el _id por id
BandSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

//método para incrementar los votos
BandSchema.method('incrementVotes', function() {
    console.log(this);
    this.votes++;
    return this.save();
});


module.exports = model('Band', BandSchema);

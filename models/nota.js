import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    nombre: {type: String, required: [true, 'Obligatorio']},
    descripcion: String,
    usuarioId: String,
    date: {type: Date, default: Date.Now},
    activo: {type: Boolean, default: true}
});

const Nota = mongoose.model('Nota', notaSchema);
export default Nota;
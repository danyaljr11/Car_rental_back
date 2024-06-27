const Brand = require("../database/models/Brand");
const normalizePath = require("../helpers/normalizePathName");
const brandSchema = require("../validation/brandValidation");

const createBrand = async (req, res) => {
    const { name, picture } = req.body;

    if(!picture) {
        return res.status(400).send({ state: 'failed', message: 'You must insert a picture' });        
    }

    let path = normalizePath(picture);  

    const { error } = brandSchema.validate({
        name,
        picture: path,
    });

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message });        
    }

    try {
        await Brand.create({ name, picture: path });

        return res.status(200).send({ state: 'success', message: 'Created brand successfully' });                
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });               
    }
}

const updateBrand = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const file = req.file

    if(!file) {
        return res.status(400).send({ state: 'failed', message: 'You must insert a file as picture' });        
    }

    let path = normalizePath(file);  

    const { error } = brandSchema.validate({
        name,
        picture: path,
    });

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message });        
    }

    const brand = await Brand.findById(id);

    if(!brand) {
        return res.status(400).send({ state: 'failed', message: 'This brand does not exist' });        
    }

    try {
        if(path) {
            await Brand.findByIdAndUpdate(id ,{ name, picture: path });
        } else {
            await Brand.findByIdAndUpdate(id ,{ name, picture: path });
        }
        
        return res.status(200).send({ state: 'success', message: 'Updated brand successfully' });                
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });               
    }
}

const showBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});

        return res.status(200).send({ state: 'success', message: 'Show all brands successfully', brands });                
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });                       
    }
}

const showBrand = async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findById(id);

        if(!brand) {
            return res.status(400).send({ state: 'failed', message: 'This brand does not exist' });                       
        }

        return res.status(200).send({ state: 'success', message: 'Show brand successfully', brand });                
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });                       
    }
}

const deleteBrand = async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findById(id);

        if(!brand) {
            return res.status(400).send({ state: 'failed', message: 'This brand does not exist' });                       
        }

        await Brand.findByIdAndDelete(id);

        return res.status(200).send({ state: 'success', message: 'Deleted brand successfully' });                
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message });                       
    }
}


module.exports = {
    showBrand,
    showBrands,
    createBrand,
    deleteBrand,
    updateBrand
}
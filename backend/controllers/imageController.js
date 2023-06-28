const path = require('node:path'); 
const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');

const getImage = async (req, res) => {
    const { id } = req.params;
    
    try {
        res.status(200).sendFile(path.join(__dirname, `../images/${id}.png`));
    } catch (error) {
        console.error(error);
        res.status(400).json({ err: error.message });
    }
};

const putImage = async (id, url) => {
    const getRes = await axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
    });
    
    return await sharp(getRes.data).png().toFile(`./images/${id}.png`);
};

const deleteImage = async (id) => {
    fs.unlinkSync(`./images/${id}.png`);
};

module.exports = {
    getImage,
    putImage,
    deleteImage
};
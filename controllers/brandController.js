const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name, role} = req.body
        if(role === "ADMIN") {
            const brand = await Brand.create({name})
            return res.json(brand)
        }else{
            return res.json("No access")
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()

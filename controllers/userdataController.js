const uuid = require('uuid')
const path = require('path');
const {Userdata, DeviceInfo, Device} = require('../models/models')
const ApiError = require('../error/ApiError');

class UserdataController {

    async create(req, res, next) {
        try {
            let {name, rating, userId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const userdata = await Userdata.create({name, rating, userId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: userdata.id
                    })
                )
            }

            return res.json(userdata)
        } catch (e) {
            next(ApiError.badRequest(e.message + " 1111"))
        }
    }

    // async getAll(req, res) {
    //     let {brandId, typeId, limit, page} = req.query
    //     page = page || 1
    //     limit = limit || 9
    //     let offset = page * limit - limit
    //     let devices;
    //     if (!brandId && !typeId) {
    //         devices = await Device.findAndCountAll({limit, offset})
    //     }
    //     if (brandId && !typeId) {
    //         devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
    //     }
    //     if (!brandId && typeId) {
    //         devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
    //     }
    //     if (brandId && typeId) {
    //         devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
    //     }
    //     return res.json(devices)
    // }
    //
    //
    //
    // async getOne(req, res) {
    //     const {id} = req.params
    //     const device = await Device.findOne(
    //         {
    //             where: {id},
    //             include: [{model: DeviceInfo, as: 'info'}]
    //         },
    //     )
    //     return res.json(device)
    // }
}

module.exports = new UserdataController()

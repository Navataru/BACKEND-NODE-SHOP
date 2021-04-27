const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const db = require('../dbPool')

class DeviceController {

    async create(req, res, next) {
        try {
            let {brandId, typeId, userId, userdatumId, info} = req.body

            const device = await Device.create({brandId, typeId, userId, userdatumId});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // async create(req, res, next) {
    //     try {
    //         let {name, price, brandId, typeId, userId, info} = req.body
    //         const {img} = req.files
    //         let fileName = uuid.v4() + ".jpg"
    //         img.mv(path.resolve(__dirname, '..', 'static', fileName))
    //         const device = await Device.create({name, price, brandId, typeId, userId, img: fileName});
    //
    //         if (info) {
    //             info = JSON.parse(info)
    //             info.forEach(i =>
    //                 DeviceInfo.create({
    //                     title: i.title,
    //                     description: i.description,
    //                     deviceId: device.id
    //                 })
    //             )
    //         }
    //
    //         return res.json(device)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }


    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 50
        let offset = page * limit - limit
        let devices;
        //req.params
        //const id = req.params.brandId
        const id = null
        if (!brandId && !typeId) {
            devices = await db.query('SELECT * FROM userdata JOIN devices on userdata.id = devices."userdatumId"')
            //devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await db.query('SELECT * FROM userdata JOIN devices on userdata.id = devices."userdatumId" WHERE devices."brandId" = $1', [brandId] )
            //devices = await Device.findAndCountAll({where:{brandId}, limit, offset})

        }
        if (!brandId && typeId) {
            devices = await db.query('SELECT * FROM userdata JOIN devices on userdata.id = devices."userdatumId" WHERE devices."typeId" = $1', [typeId] )
            //devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await db.query('SELECT * FROM userdata JOIN devices on userdata.id = devices."userdatumId" WHERE devices."brandId" = $1 AND devices."typeId" = $2', [brandId, typeId] )
            //devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }



    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()

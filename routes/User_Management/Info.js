import express from "express";
import Info from "../../models/User_Management/Info.js";
import User from "../../models/User_Management/User.js";

const router = express.Router();

// GET ALL INFOS
router.get('/', async (req, res) => {
    try {
        const infos = await Info.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả thông tin của người dùng thành công', 
            data: infos
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// GET INFO
router.get('/:id', async (req, res) => {
    try {
        const info = await Info.findById(req.params.id).populate('User', ['Username', 'Email']);
        res.status(200).json({ 
            success: true,
            message: 'Lấy thông tin người dùng thành công!',
            data: info 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// ADD INFO
router.post('/create/:userID', async (req, res) => {

    try {
        const user = await User.findById(req.params.userID);
        if (user.Info) {
            return res.status(401).json({
                success: false,
                message: 'User này đã có thông tin cá nhân'
            });
        }

        const newInfo = new Info({
            ...req.body,
            User: user._id
        });
        const savedInfo = await newInfo.save();
        await user.updateOne({ $push: { Info: savedInfo._id } });

        res.status(200).json({
            success: true,
            message: 'Thêm thông tin người dùng thành công',
            info: savedInfo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router
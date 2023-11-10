import express from "express";
import Token from '../../models/User_Management/Token.js';

const router = express.Router();

// GET ALL TOKENS
router.get('/', async (req, res) => {
    try {
        const tokens = await Token.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả token thành công', 
            data: tokens
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// DELETE TOKENS
router.delete('/delete/:id', async (req, res) => {
    try {
        await Token.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Xóa token thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router
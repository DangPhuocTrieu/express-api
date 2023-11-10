import express from "express";
import jwt from 'jsonwebtoken';
import User from '../../models/User_Management/User.js';
import Token from '../../models/User_Management/Token.js';

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await User.findOne({ Username });

        // nếu tìm thấy user trong database
        if (user && Password === user.Password) {
            // tạo token
            const data = { UserId: user._id, IsAdmin: user.IsAdmin };
            const token = jwt.sign(data, process.env.TOKEN_KEY);

            // tìm token của user vừa đăng nhập đã có trong database hay chưa
            const authRecord  = await Token.findOne({ UserID: user._id });

            // nếu có => cập nhập token đó
            if (authRecord) {
                authRecord.Token = token;
                await authRecord.save();
                res.status(200).json({ 
                    success: true,
                    message: 'Đăng nhập thành công',
                    token: authRecord
                });

             // nếu không => tạo token mới
            } else {
                const newAuth = new Token({ UserID: user._id, Token: token });
                await newAuth.save();
                res.status(200).json({ 
                    success: true,
                    message: 'Đăng nhập thành công',
                    token: newAuth
                });
            }

        } else {
            res.status(500).json({
                success: false,
                message: 'Username hoặc password không chính xác'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }   
});

// REGISTER
router.post('/register', async (req, res) => {
    const { Username, Email } = req.body;

    try {
        const extistUserName = await User.findOne({ Username });
        const extistEmail = await User.findOne({ Email });

        if (!extistUserName && !extistEmail) {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            
            res.status(200).json({ 
                success: true,
                message: 'Đăng kí thành công',
                data: savedUser
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Username hoặc email đã tồn tại'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }   
});

// LOGOUT
router.post('/logout', async (req, res) => {
    const token = req.body.token;
    try {
        const deletedAuth = await Token.findOneAndDelete({ Token: token });
        if (deletedAuth) {
            res.status(500).json({
                success: true,
                message: 'Đăng xuất thành công'
            });
        } else {
            res.status(500).json({
                success: true,
                message: 'Đăng xuất không thành công'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }   
});

export default router
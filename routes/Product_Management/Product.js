import express from "express";
import Product from "../../models/Product_Management/Product.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả sản phẩm thành công', 
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
})

// GET PRODUCT
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ 
            success: true,
            message: 'Lấy sản phẩm thành công!',
            data: product 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// ADD PRODUCT
router.post('/create', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json({
            success: true,
            message: 'Thêm sản phẩm thành công',
            product: savedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// EDIT PRODUCT
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({
            success: true,
            message: 'Sửa sản phẩm thành công!'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});

// DELETE PRODUCT
router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router
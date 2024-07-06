export const beautifyId = (id) => {
    return id.replace(/-/g, '').toUpperCase();
}

export const convertText = (text) => {
    switch (text) {
        case 'POST':
            return "Văn phòng giao dịch"
        case 'WAREHOUSE':
            return "Văn phòng tập kết"
        case 'POST_HEAD':
            return "Trưởng điểm giao dịch"
        case 'WAREHOUSE_HEAD':
            return "Trưởng điểm tập kết"
        case 'CEO':
            return "Giám đốc"
        case 'EMPLOYEE':
            return "Nhân viên"
        case 'RECEIVED_FROM_CUSTOMER':
            return "Đã nhận hàng từ khách"
        case 'RECEIVED_FROM_SHOP':
            return "Hàng đã nhập kho"
        case 'GONE_FROM_SHOP':
            return "Hàng đã xuất kho"
        case 'SENT_TO_CUSTOMER_SUCCESS':
            return "Giao hàng thành công"
        case 'SENT_TO_CUSTOMER_FAIL':
            return "Giao hàng thất bại"
        case 'COMING_TO_SHOP':
            return "Đang trên đường đến"
        case 'SHIPPING_TO_CUSTOMER':
            return "Đang chuyển tới khách"
        case 'DOCUMENT':
            return "Tài liệu"
        case 'PRODUCT':
            return "Hàng hóa"
        default:
            return ""
    }
}
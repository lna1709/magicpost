export function isValidPhoneNumber(phoneNumber) {
    const regex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/;
    return regex.test(phoneNumber);
}

export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidName(name) {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name);
}

export function isValidPassword(password) {
    // Kiểm tra xem mật khẩu có ít nhất 8 ký tự hay không
    if (password.length < 8) {
        return false;
    }

    // Kiểm tra xem mật khẩu có chứa chữ hoa hay không
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Kiểm tra xem mật khẩu có chứa chữ thường hay không
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Kiểm tra xem mật khẩu có chứa số hay không
    if (!/[0-9]/.test(password)) {
        return false;
    }

    // Kiểm tra xem mật khẩu có chứa ký tự đặc biệt hay không
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return false;
    }

    // Nếu mật khẩu thoả mãn tất cả các điều kiện trên, trả về true
    return true;
}

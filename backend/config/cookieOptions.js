const cookieOptions = {
    httpOnly: true, // The cookie can't be accessed via JavaScript
    // secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    sameSite: 'none', // Helps prevent CSRF attacks-> 'Strict , 'Lax'
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
};

export default cookieOptions
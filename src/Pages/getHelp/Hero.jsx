import React from 'react';
import girlImg from '../../assets/hero.jpg'; // Ảnh minh họa
import gmailIcon from '../../assets/gmail.png'; // Icon Gmail
import facebookIcon from '../../assets/facebook.png';
// import các icon khác nếu có

const icons = [
    { src: gmailIcon, alt: 'Gmail' },
    { src: facebookIcon, alt: 'Facebook' },
    // Thêm các icon khác nếu có
];

const Hero = () => {
    return (
        <section className="flex flex-col md:flex-row justify-between items-center px-10 py-20 max-w-7xl mx-auto rounded-xl">
            {/* Nội dung bên trái */}
            <div className="md:w-1/2 space-y-6 text-white">
                <h1 className="text-5xl font-bold">
                    <span className="text-yellow-300">Cứu trợ</span> thiên tai
                </h1>
                <p className="text-lg">
                    Chung tay giúp đỡ đồng bào bị ảnh hưởng bởi bão lũ và thiên tai trên cả nước.
                </p>
                <ul className="space-y-1 text-white">
                    <li>✓ Hỗ trợ thực phẩm, nước sạch và thuốc men</li>
                    <li>✓ Huy động nguồn lực khẩn cấp 24/7</li>
                    <li>✓ Minh bạch, rõ ràng, không qua trung gian</li>
                    <li>✓ Bạn có thể góp sức chỉ với vài chục ngàn đồng</li>
                </ul>
                <button className="bg-yellow-400 text-red-700 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
                    Nhận hỗ trợ
                </button>
                <p className="text-sm text-white/80">mọi thông tin khẩn cấp vui lòng liên lạc vào đường dây mặt trận tổ quốc: 0813.051.989</p>
            </div>

            {/* Hình ảnh + icon bên phải */}
            <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center items-center">
                <img src={girlImg} alt="Support" className="w-[400px] relative z-10" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                    {icons.map((icon, idx) => (
                        <img
                            key={idx}
                            src={icon.src}
                            alt={icon.alt}
                            className="w-8 h-8 bg-white p-1 rounded-full shadow-md"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;

import { client } from '@/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { name, email, message } = formData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };

        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-white p-3 rounded-lg">
            <h2 className="text-center font-primaryFont font-bold text-[18px] md:text-[24px] lg:text-[28px]">
                Silakan jangan ragu untuk hubungi saya 😄
            </h2>
            <div className="flex flex-col gap-3 items-center mt-2 w-full">
                <div className='md:flex gap-2'>
                <div className="gap-2 flex">
                  <Link to={'https://wa.link/qq350h'} className='flex bg-green-200 p-2 rounded-md'>
                  <img src="https://cdn-icons-png.flaticon.com/128/186/186239.png" width={24} height={24} alt="Phone" 
                  className='w-6 h-6'/>
                  <p className='md:text-[18px] text-[14px] text-gray-500'>+62-859-0435-1897</p>
                  </Link>
                  </div>
                <div className="gap-2 flex">
                  <Link to={'mailto:thisone564@gmail.com'} className='flex bg-blue-200 p-2 rounded-md'>
                  <img src="https://cdn-icons-png.flaticon.com/128/726/726623.png" width={24} height={24} alt="Phone" 
                  className='w-6 h-6'/>
                  <p className='md:text-[18px] text-[14px] text-gray-500 ml-2'>thisone564@gmail.com</p>
                  </Link>
                  </div>
                </div>
            </div>

            {!isFormSubmitted ? (
                <div className="w-full flex flex-col p-4">
                    <div className="w-full mb-3 rounded-lg cursor-pointer bg-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg">
                        <input
                            className="w-full p-4 rounded-md bg-gray-300 font-base text-black outline-none"
                            type="text"
                            placeholder="Nama"
                            name="name"
                            value={name}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="w-full mb-3 rounded-lg cursor-pointer bg-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg">
                        <input
                            className="w-full p-4 rounded-md bg-gray-300 font-base text-black outline-none"
                            type="email"
                            placeholder="Email & No Whatsapp"
                            name="email"
                            value={email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="w-full mb-3 rounded-lg cursor-pointer bg-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg">
                        <textarea
                            className="w-full p-4 rounded-md bg-gray-300 font-base text-black outline-none h-40"
                            placeholder="Pesan"
                            value={message}
                            name="message"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button
                        type="button"
                        className="px-8 py-4 mt-8 rounded-lg bg-primary font-medium text-white outline-none transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {!loading ? 'Kirim Pesan' : 'Sending...'}
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-center font-primaryFont font-bold text-lg mt-4">
                        Terima kasih, atas pesan anda😊, dan segera saya tanggapi🚀!
                    </h3>
                </div>
            )}
        </div>
    );
};

export default Contact;

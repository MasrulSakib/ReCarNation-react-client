import React, { useContext } from 'react';
import { AuthContext } from '../../UserValidation/Context/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const handleAddProduct = data => {
        const product = {
            seller_name: data.seller_name,
            email: data.email,
            company: data.company,
            name: data.name,
            original_price: parseInt(data.original_price),
            resale_price: parseInt(data.resale_price),
            condition: data.condition,
            phone: parseInt(data.phone),
            location: data.location,
            years_of_use: parseInt(data.years_of_use),
            picture: data.picture,
            posted_time: data.date,
            description: data.description
        }

        fetch(`https://recarnation-react-server.vercel.app/cars`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },

            body: JSON.stringify(product)
        })

            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${data.company} ${data.name} is successfully added`)
                navigate('/dashboard/myproducts')
            })
    }



    return (
        <div className='md:container md:mx-auto mx-5 min-h-screen'>
            <h2 className='text-2xl font-semibold md:text-3xl text-left mt-5'>Add a Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)} className='border-2 border-error p-10 my-10'>
                <div className='grid gap-3 grid-cols-1 md:grid-cols-2 my-6'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input {...register("seller_name")} type="text" placeholder="Your name" readOnly value={user?.displayName} className="input input-bordered input-error w-full" />
                        {errors.seller_name && <p className='text-error' role="alert">{errors.seller_name.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input {...register("email")} type="email" placeholder="Your Email" readOnly value={user?.email} className="input input-bordered input-error w-full" />
                        {errors.email && <p className='text-error' role="alert">{errors.email.message}</p>}

                    </label>

                    <label>
                        <div className="label">
                            <span className="label-text">Brand Category</span>
                        </div>
                        <select {...register("company", { required: 'Category is required' })} placeholder="company" className="select select-error w-full">

                            <option >Toyota</option>
                            <option >Mazda</option>
                            <option>Lamborghini</option>
                            <option >Mercedes-Benz</option>
                            <option >Ford</option>
                        </select>
                        {errors.company && <p className='text-error' role="alert">{errors.company.message}</p>}

                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Model</span>
                        </div>
                        <input {...register("name", { required: 'Model is required' })} type="text" placeholder="Car's model" className="input input-bordered input-error w-full" />
                        {errors.name && <p className='text-error' role="alert">{errors.name.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Buying Price</span>
                        </div>
                        <input {...register("original_price", { required: 'Buying price is required' })} type="text" placeholder="Original Price" className="input input-bordered input-error w-full" />
                        {errors.original_price && <p className='text-error' role="alert">{errors.original_price.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Selling Price</span>
                        </div>
                        <input {...register("resale_price", { required: 'Selling price is required' })} type="text" placeholder="Selling Price" className="input input-bordered input-error w-full" />
                        {errors.resale_price && <p className='text-error' role="alert">{errors.resale_price.message}</p>}
                    </label>

                    <label>
                        <div className="label">
                            <span className="label-text">Condition Type</span>
                        </div>
                        <select {...register("condition", { required: 'Condition is required' })} placeholder="condition" className="select select-error w-full">
                            <option >Excellent</option>
                            <option >Good</option>
                            <option>Fair</option>
                        </select>
                        {errors.condition && <p className='text-error' role="alert">{errors.condition.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Phone No.</span>
                        </div>
                        <input {...register("phone", { required: 'Phone number is required' })} type="phone" placeholder="Your phone number" className="input input-bordered input-error w-full" />
                        {errors.phone && <p className='text-error' role="alert">{errors.phone.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Location</span>
                        </div>
                        <input {...register("location", { required: 'Location is required' })} type="text" placeholder="Your location" className="input input-bordered input-error w-full" />
                        {errors.location && <p className='text-error' role="alert">{errors.location.message}</p>}
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Years of use</span>
                        </div>
                        <input {...register("years_of_use", { required: 'Years of use is required' })} type="number" placeholder="Your product using duration in years" className="input input-bordered input-error w-full" />
                        {errors.years_of_use && <p className='text-error' role="alert">{errors.years_of_use.message}</p>}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Cars Photo URL</span>
                        </div>
                        <input {...register("picture", { required: 'Photo is required' })} type="text" placeholder="Your Cars Photo URL" className="input input-bordered input-error w-full" />
                        {errors.picture && <p className='text-error' role="alert">{errors.picture.message}</p>}
                    </label>
                    <label className='form-control w-full'>
                        <div className="label">
                            <span className="label-text">Uploading Date</span>
                        </div>
                        <input {...register("date", { required: 'Date is required' })} type="date" defaultValue={formattedDate} readOnly className="input input-bordered input-error w-full" />
                        {errors.date && <p className='text-error' role="alert">{errors.date.message}</p>}
                    </label>
                    <label className="form-control w-full grid md:col-span-2 col-span-1">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea {...register("description", { required: 'description is required' })} placeholder="tell us more about your car" className="textarea textarea-error w-full"></textarea>
                        {errors.description && <p className='text-error' role="alert">{errors.description.message}</p>}
                    </label>

                </div>
                <input type="submit" value="Add Product" className='btn btn-error w-full' />
            </form>
        </div>
    );
};

export default AddProducts;
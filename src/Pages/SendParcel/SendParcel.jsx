import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/UseAuth';

export default function SendParcel() {
    const { register,
         handleSubmit, 
         watch, 
        //  formState: { errors } 
        } = useForm();
    const { user } = useAuth()
    // console.log(user)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // console.log(axiosSecure)
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters)
    const reasonsDuplicate = serviceCenters.map(c => c.region)
    const reasons = [...new Set(reasonsDuplicate)]
    const senderReason = watch('senderReason')
    const receiverReason = watch('receiverReason')
    // console.log(reasons)

    const districtByReasons = (reason) => {
        const reasonDistrict = serviceCenters.filter(c => c.region === reason)
        const districts = reasonDistrict.map(d => d.district)
        return districts;
    }

    const handleSendParcel = (data) => {
        // console.log(data);
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)
        console.log(isSameDistrict)

        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraweight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraweight * 40 : extraweight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log("The total cost is", cost);
        data.cost = cost;

        Swal.fire({
            title: "Are you agree with cost?",
            text: `You will be charge ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "conform & continue payment!"
        }).then((result) => {
            // console.log(result)
            if (result.isConfirmed) {
                console.log("callled is conformed")
                // save the parcel info to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('arter saveing parcel', res.data)
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                title: "Your parcel has created. Please pay",
                                showConfirmButton: false,
                                // text: "",
                                icon: "success",
                                timer: 2500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })


            }
        });
    }
    return (
        <div>
            <h1 className="text-5xl font-bold mt-8">Add Parcel</h1>
            <form className='my-8 p-4 text-black' onSubmit={handleSubmit(handleSendParcel)}>

                {/* parcel type */}
                <div className=''>
                    <label className="label font-semibold text-xl mr-5">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label font-semibold text-xl">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel information name and weight */}
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 my-5'>
                    <fieldset className="fieldset">
                        <label className="label font-semibold text-xl">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label font-semibold text-xl">Parcel Weight(kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>

                </div>

                {/* Details */}
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10'>

                    {/* sender Details */}
                    <div>
                        <h4 className="text-xl font-semibold mt-8">Sender Details</h4>
                        <fieldset className="fieldset mt-3 mb-8">
                            {/* sender name */}
                            <label className="label font-semibold text-xl">Sender Name</label>
                            <input defaultValue={user.displayName} type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />
                            {/* sender email */}
                            <label className="label font-semibold text-xl">Sender Email</label>
                            <input defaultValue={user?.email} type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                            {/* sender Reasons */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Regions</legend>
                                <select {...register('senderReason')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        reasons.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>
                            {/* sender District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend"> Sender District</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a district" className="select w-full">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByReasons(senderReason).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>


                            {/* sender District */}
                            {/* <label className="label font-semibold text-xl mt-3">Sender District</label>
                            <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Sender District" /> */}


                            {/* sender address */}
                            <label className="label font-semibold text-xl mt-3">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input  w-full" placeholder="Sender Address" />
                            {/* sender phone number */}
                            <label className="label font-semibold text-xl mt-3">Sender Phone Number</label>
                            <input type="number" {...register('senderPhoneNumber')} className="input w-full" placeholder="Sender Phone Number" />

                            {/* Pickup Instruction */}
                            <label className="label font-semibold text-xl mt-3">Pickup Instruction</label>
                            <textarea {...register('pickupInstruction')} className="textarea w-full " rows={4} placeholder="Pickup Instruction" />
                        </fieldset>
                    </div>

                    {/* Receiver Details */}
                    <div>
                        <h4 className="text-xl font-semibold mt-8">Receiver Details</h4>
                        <fieldset className="fieldset mt-3 mb-8">
                            {/* Receiver name */}
                            <label className="label font-semibold text-xl">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                            {/* Receiver email */}
                            <label className="label font-semibold text-xl">Receiver Email</label>
                            <input type="email" {...register('ReceiverEmail')} className="input w-full" placeholder="Receiver Email" />

                            {/* Receiver Reasons */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Regions</legend>
                                <select {...register('receiverReason')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        reasons.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* Receiver District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select w-full">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByReasons(receiverReason).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* Receiver District */}
                            {/* <label className="label font-semibold text-xl mt-3">Receiver District</label>
                            <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="Receiver District" /> */}

                            {/* Receiver address */}
                            <label className="label font-semibold text-xl mt-3">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input  w-full" placeholder="Receiver Address" />
                            {/* Receiver phone number */}
                            <label className="label font-semibold text-xl mt-3">Receiver Phone Number</label>
                            <input type="number" {...register('receiverPhoneNumber')} className="input w-full" placeholder="Receiver Phone Number" />

                            {/*Delivery Instruction */}
                            <label className="label font-semibold text-xl mt-3">Delivery Instruction</label>
                            <textarea {...register('deliveryInstruction')} className="textarea w-full " rows={4} placeholder="Delivery Instruction" />
                        </fieldset>
                    </div>
                </div>
                <button className='btn btn-primary text-black' type="submit">Send Parcel</button>
            </form>
        </div>
    )
}
